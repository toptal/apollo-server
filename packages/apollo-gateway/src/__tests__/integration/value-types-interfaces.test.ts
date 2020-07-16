import gql from 'graphql-tag';
import { astSerializer, queryPlanSerializer } from '../../snapshotSerializers';
import { execute, ServiceDefinitionModule } from '../execution-utils';

expect.addSnapshotSerializer(astSerializer);
expect.addSnapshotSerializer(queryPlanSerializer);

const videos = [{ id: 'Video/1', url: 'https://foobar.com/videos/1' }];
const audios = [{ id: 'Audio/1', url: 'https://foobar.com/audios/1' }];

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
        return ids.map(id => ({ id, type: id.split('/')[0] }));
      }
    },
    Node: {
      __resolveType(object) {
        return object.type;
      },
    }
  }
};

type Video = { id: String, url: String }
const videoService: ServiceDefinitionModule = {
  name: 'videoService',
  typeDefs: gql`
    interface WebResource {
      url: String
    }
    type Video implements WebResource @key(fields: "id") {
      id: ID!
      url: String
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
      url(object: Video) {
        return object.url;
      },
    },
  },
};

type Audio = { id: String, url: String }
const audioService: ServiceDefinitionModule = {
  name: 'audioService',
  typeDefs: gql`
    interface WebResource {
      url: String
    }
    type Audio @key(fields: "id") {
      id: ID!
      url: String
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
    },
  },
};

it('handles unions from different services which implements value interfaces', async () => {
  const query = `#graphql
    query q($ids: [ID!]!) {
      nodes(ids: $ids) {
        ... on WebResource {
          url
        }
      }
    }
  `;
  const variables = {ids: [videos[0].id, audios[0].id]}
  const { queryPlan, errors, data } = await execute({ query, variables }, [
    nodeService,
    videoService,
    audioService,
  ]);
  expect(errors).toBeUndefined();

  expect(queryPlan).toMatchInlineSnapshot(`
    QueryPlan {
      Sequence {
        Fetch(service: "nodeService") {
          {
            nodes {
              __typename
              ... on Video {
                __typename
                id
              }
              ... on Audio {
                __typename
                id
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
                  url
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
                  url: url
                }
              }
            },
          },
        },
      },
    }
  `);
  expect(data).toEqual({
    nodes: [
      { url: 'https://foobar.com/videos/1' },
      { url: 'https://foobar.com/audios/1' },
    ],
  });
});
