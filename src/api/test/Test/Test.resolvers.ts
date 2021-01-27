import { getGithubToken } from '../../../libs/utils/authenticate';
import { TestResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';

const resolvers: Resolvers = {
  Query: {
    Test: async (_, __): Promise<TestResponse> => {
      const test = await getGithubToken('test');

      return {
        ok: true,
        error: test,
      };
    },
  },
};

export default resolvers;
