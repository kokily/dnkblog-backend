import { getManager, getRepository } from 'typeorm';
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
            prev: null,
            next: null,
          };
        }

        await getRepository(Post).update({ id }, { counter: post.counter + 1 });

        if (!post) {
          return {
            ok: false,
            error: 'Does not exist Post',
            post: null,
            prev: null,
            next: null,
          };
        } else {
          const nearQuery = await getManager()
            .createQueryBuilder(Post, 'posts')
            .where('posts.category = :category', { category: post.category })
            .orderBy('posts.created_at', 'ASC');

          const posts = await nearQuery.getMany();

          const postIndex = posts.findIndex((data) => {
            if (data.id === post.id) {
              return true;
            } else {
              return false;
            }
          });

          let prev;
          let next;

          if (postIndex < 1 && posts.length === 1) {
            prev = null;
            next = null;
          } else if (postIndex < 1 && posts.length > 1) {
            prev = null;
            next = posts[postIndex + 1];
          } else if (postIndex + 1 === posts.length) {
            prev = posts[postIndex - 1];
            next = null;
          } else {
            prev = posts[postIndex - 1];
            next = posts[postIndex + 1];
          }

          return {
            ok: true,
            error: null,
            post,
            prev,
            next,
          };
        }
      } catch (err) {
        return {
          ok: false,
          error: err.message,
          post: null,
          prev: null,
          next: null,
        };
      }
    },
  },
};

export default resolvers;
