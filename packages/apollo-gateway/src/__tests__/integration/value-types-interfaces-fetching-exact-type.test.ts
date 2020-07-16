import gql from 'graphql-tag';
import { astSerializer, queryPlanSerializer } from '../../snapshotSerializers';
import { execute, ServiceDefinitionModule } from '../execution-utils';

expect.addSnapshotSerializer(astSerializer);
expect.addSnapshotSerializer(queryPlanSerializer);

const videos = [
  { id: 'Video/1', videoData: 'videoData', errorCode: 'videoErrorCode' },
];
const audios = [
  { id: 'Audio/1', audioData: 'audioData', errorCode: 'audioErrorCode' },
];

const nodeService: ServiceDefinitionModule = {
  name: 'nodeService',
  typeDefs: gql`
    type Query {
      nodes(ids: [ID!]!): [Node!]!
    }

    extend type Video implements Node @key(fields: "id") {
      id: ID! @external
    }
    extend type Audio implements Node @key(fields: "id") {
      id: ID! @external
    }
    interface Node {
      id: ID!
    }
  `,
  resolvers: {
    Query: {
      nodes(_, { ids }) {
        return ids.map((id: string) => ({ id, type: id.split('/')[0] }));
      },
    },
    Node: {
      __resolveType(object) {
        return object.type;
      },
    },
  },
};

type Video = { id: String; videoData: String; errorCode: String };
const videoService: ServiceDefinitionModule = {
  name: 'videoService',
  typeDefs: gql`
    interface UserErrors {
      code: String
    }
    type Video @key(fields: "id") {
      id: ID!
      videoData: String
      errors: [UserErrors!]!
    }

    type VideoErrors implements UserErrors {
      code: String
    }
  `,
  resolvers: {
    Video: {
      __resolveReference(object: { id: String }) {
        return videos.find((video) => video.id === object.id);
      },
      id(object: Video) {
        return object.id;
      },
      errors(object: Video) {
        return [{ code: object.errorCode }];
      },
      videoData(object: Video) {
        return object.videoData;
      },
    },
  },
};

type Audio = { id: String; audioData: String; errorCode: String };
const audioService: ServiceDefinitionModule = {
  name: 'audioService',
  typeDefs: gql`
    interface UserErrors {
      code: String
    }
    type Audio @key(fields: "id") {
      id: ID!
      errors: [UserErrors!]!
      audioData: String
    }

    type AudioErrors implements UserErrors {
      code: String
    }
  `,
  resolvers: {
    Audio: {
      __resolveReference(object: { id: String }) {
        return audios.find((audio) => audio.id === object.id);
      },
      id(object: Audio) {
        return object.id;
      },
      errors(object: Audio) {
        return [{ code: object.errorCode }];
      },
      audioData(object: Audio) {
        return object.audioData;
      },
    },
  },
};

it('handles unions from different services which implements value interfaces', async () => {
  const query = `#graphql
    query q($ids: [ID!]!) {
      nodes(ids: $ids) {
        id
        ... on Audio {
          errors {
            code
          }
        }
        ... on Video {
          errors {
            code
          }
        }
      }
    }
  `;
  const variables = { ids: [videos[0].id, audios[0].id] };
  const { queryPlan, errors, data } = await execute({ query, variables }, [
    nodeService,
    videoService,
    audioService,
  ]);

  expect(queryPlan).toMatchInlineSnapshot(`
  QueryPlan {
    Sequence {
      Fetch(service: "nodeService") {
        {
          nodes(ids: $ids) {
            __typename
            ... on Video {
              id
              __typename
            }
            ... on Audio {
              id
                __typename
              }
            }
          }
        },
        Parallel {
          Sequence {
            Flatten(path: "nodes.@") {
              Fetch(service: "audioService") {
                {
                  ... on Audio {
                    __typename
                    id
                  }
                } =>
                {
                  ... on Audio {
                    errors {
                      __typename
                      ... on VideoErrors {
                        __typename
                      }
                      ... on AudioErrors {
                        code
                      }
                    }
                  }
                }
              },
            },
            Flatten(path: "nodes.@.errors.@") {
              Fetch(service: "videoService") {
                {
                  ... on VideoErrors {
                    __typename
                  }
                } =>
                {
                  ... on VideoErrors {
                    code
                  }
                }
              },
            },
          },
          Sequence {
            Flatten(path: "nodes.@") {
              Fetch(service: "videoService") {
                {
                  ... on Video {
                    __typename
                    id
                  }
                } =>
                {
                  ... on Video {
                    errors {
                      __typename
                      ... on AudioErrors {
                        __typename
                      }
                      ... on VideoErrors {
                        code
                      }
                    }
                  }
                }
              },
            },
            Flatten(path: "nodes.@.errors.@") {
              Fetch(service: "audioService") {
                {
                  ... on AudioErrors {
                    __typename
                  }
                } =>
                {
                  ... on AudioErrors {
                    code
                  }
                }
              },
            },
          },
        },
      },
    }
    `);
    expect(errors).toBeUndefined();
    expect(data).toEqual({
    nodes: [
      {
        id: 'Video/1',
        errors: [{ code: 'videoErrorCode' }],
      },
      {
        id: 'Audio/1',
        errors: [{ code: 'audioErrorCode' }],
      },
    ],
  });
});
