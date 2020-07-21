import gql from 'graphql-tag';
import { astSerializer, queryPlanSerializer } from '../../snapshotSerializers';
import { execute, ServiceDefinitionModule } from '../execution-utils';

expect.addSnapshotSerializer(astSerializer);
expect.addSnapshotSerializer(queryPlanSerializer);

const audio = { errorCode: 'audioErrorCode' };

const videoService: ServiceDefinitionModule = {
  name: 'videoService',
  typeDefs: gql`
    interface Error {
      code: String
    }

    type VideoError implements Error {
      code: String
    }
  `,
  resolvers: {},
};

const audioService: ServiceDefinitionModule = {
  name: 'audioService',
  typeDefs: gql`
    type Query {
      error: Error!
    }

    interface Error {
      code: String
    }

    type AudioError implements Error {
      code: String
    }
  `,
  resolvers: {
    Query: {
      error(_) {
        return { code: audio.errorCode };
      },
    },
    Error: {
      __resolveType(_) {
        return 'AudioError';
      },
    },
  },
};

it('handles value types interfaces which have implementation with orphan types in different schema', async () => {
  const query = `#graphql
    query q {
      error {
        code
      }
    }
  `;
  const variables = {};
  const { queryPlan, errors, data } = await execute({ query, variables }, [
    videoService,
    audioService,
  ]);

  expect(queryPlan).toMatchInlineSnapshot(`
    QueryPlan {
      Fetch(service: "audioService") {
        {
          error {
            __typename
            ... on AudioError {
              code
            }
          }
        }
      },
    }
  `);
  expect(errors).toBeUndefined();
  expect(data).toEqual({ error: { code: 'audioErrorCode' } });
});
