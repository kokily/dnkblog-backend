import { getManager, getRepository } from 'typeorm';
import { TagPostsQueryArgs, TagPostsResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import Post from '../../../entities/Post';

const resolvers: Resolvers = {
  Query: {
    TagPosts: async (_, args: TagPostsQueryArgs): Promise<TagPostsResponse> => {
      const { cursor, tag } = args;

      try {
        const query = await getManager()
          .createQueryBuilder(Post, 'post')
          .limit(15)
          .orderBy('post.created_at', 'DESC')
          .addOrderBy('post.id', 'DESC');

        query.andWhere(":tag = ANY (string_to_array(post.tags, ','))", { tag });

        if (cursor) {
          const post = await getRepository(Post).findOne({ id: cursor });

          if (!post) {
            return {
              ok: false,
              error: 'Bad Request',
              posts: null,
            };
          }

          query.andWhere('post.created_at < :date', { date: post.created_at });
          query.orWhere('post.created_at = :date AND post.id < :id', {
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
