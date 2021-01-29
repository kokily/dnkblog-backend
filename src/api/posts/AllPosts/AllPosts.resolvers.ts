import { getManager, getRepository } from 'typeorm';
import { AllPostsQueryArgs, AllPostsResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import Post from '../../../entities/Post';

const resolvers: Resolvers = {
  Query: {
    AllPosts: async (_, args: AllPostsQueryArgs): Promise<AllPostsResponse> => {
      const { title, cursor } = args;

      try {
        const query = await getManager()
          .createQueryBuilder(Post, 'posts')
          .limit(15)
          .orderBy('posts.created_at', 'DESC')
          .addOrderBy('posts.id', 'DESC');

        if (title) {
          query.andWhere('posts.title like :title', { title: `%${title}%` });
        }

        if (cursor) {
          const post = await getRepository(Post).findOne({ id: cursor });

          if (!post) {
            return {
              ok: false,
              error: 'Bad Request',
              posts: null,
            };
          }

          query.andWhere('posts.created < :date', {
            date: post.created_at,
          });

          query.orWhere('posts.created = :date AND posts.id < id', {
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
