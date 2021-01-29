import { getRepository } from 'typeorm';
import { DivideCategoryResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import Post from '../../../entities/Post';

const resolvers: Resolvers = {
  Query: {
    DivideCategory: async (_, __): Promise<DivideCategoryResponse> => {
      try {
        const posts = await getRepository(Post).find();
        const array = posts.map((post) => {
          return post.category;
        });

        const setArray = new Set(array);
        const datum = Array.from(setArray);
        const categories = datum.map((data) => {
          return {
            name: data,
          };
        });

        return {
          ok: true,
          error: null,
          categories,
        };
      } catch (err) {
        return {
          ok: false,
          error: err.message,
          categories: null,
        };
      }
    },
  },
};

export default resolvers;
