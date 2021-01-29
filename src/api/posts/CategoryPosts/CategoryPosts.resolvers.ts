import { getManager, getRepository } from 'typeorm';
import { CategoryPostsQueryArgs, CategoryPostsResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import Post from '../../../entities/Post';

const resolvers: Resolvers = {
  Query: {
    CategoryPosts: async (
      _,
      args: CategoryPostsQueryArgs
    ): Promise<CategoryPostsResponse> => {
      const { cursor, category } = args;

      try {
        const query = await getManager()
          .createQueryBuilder(Post, 'posts')
          .limit(15)
          .orderBy('posts.created_at', 'DESC')
          .addOrderBy('posts.id', 'ASC');

        query.andWhere('posts.category = :category', { category });

        if (cursor) {
          const post = await getRepository(Post).findOne({ id: cursor });

          if (!post) {
            return {
              ok: false,
              error: 'Bad Request',
              posts: null,
            };
          }

          query.andWhere('posts.created_at < :date', {
            date: post.created_at,
          });
          query.orWhere('posts.created_at = :date AND posts.id < :id', {
            date: post.created_at,
            id: post.id,
          });
        }

        const posts = await query.getMany();

        return {
          ok: true,
          error: null,
          posts,
        };
      } catch (err) {
        return {
          ok: false,
          error: err.message,
          posts: null,
        };
      }
    },
  },
};

export default resolvers;
