import gql from 'graphql-tag';
import { astSerializer, queryPlanSerializer } from '../../snapshotSerializers';
import { execute, ServiceDefinitionModule } from '../execution-utils';

expect.addSnapshotSerializer(astSerializer);
expect.addSnapshotSerializer(queryPlanSerializer);

const videos = [{ id: 'Video/1', videoData: 'videoData' }];
const audios = [
  { id: 'Audio/1', audioData: 'audioData', url: 'https://foobar.com/audios/1' },
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

type Video = { id: String; videoData: String; url: String };
const videoService: ServiceDefinitionModule = {
  name: 'videoService',
  typeDefs: gql`
    interface WebResource {
      url: String
    }
    type Video @key(fields: "id") {
      id: ID!
      videoData: String
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

      videoData(object: Video) {
        return object.videoData;
      },
    },
  },
};

type Audio = { id: String; audioData: String; url: String };
const audioService: ServiceDefinitionModule = {
  name: 'audioService',
  typeDefs: gql`
    interface WebResource {
      url: String
    }
    type Audio implements WebResource @key(fields: "id") {
      id: ID!
      url: String
      audioData: String
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
      url(object: Audio) {
        return object.url;
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
        ... on Node { id }
        ... on Video { videoData }
        ... on Audio { audioData }
        ... on WebResource { url }
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
                  videoData
                }
              }
            },
          },
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
                  audioData
                  url
                }
              }
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
        videoData: 'videoData',
      },
      {
        id: 'Audio/1',
        audioData: 'audioData',
        url: 'https://foobar.com/audios/1',
      },
    ],
  });
});
