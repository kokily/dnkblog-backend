import { getManager } from 'typeorm';
import { ReadPostQueryArgs, ReadPostResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import Post from '../../../entities/Post';

const resolvers: Resolvers = {
  Query: {
    ReadPost: async (_, args: ReadPostQueryArgs): Promise<ReadPostResponse> => {
      const { id } = args;

      try {
        const query = await getManager()
          .createQueryBuilder(Post, 'post')
          .where('post.id = :id', { id });

        const post = await query.getOne();

        if (!post) {
          return {
            ok: false,
            error: 'Does not exist Post',
            post: null,
          };
        } else {
          return {
            ok: true,
            error: null,
            post,
          };
        }
      } catch (err) {
        return {
          ok: false,
          error: err.message,
          post: null,
        };
      }
    },
  },
};

export default resolvers;
