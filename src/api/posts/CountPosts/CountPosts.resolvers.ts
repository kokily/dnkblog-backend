import { getManager, getRepository } from 'typeorm';
import { CountPostsQueryArgs, CountPostsResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import authResolver from '../../../libs/utils/authenticate';
import Post from '../../../entities/Post';

const resolvers: Resolvers = {
  Query: {
    CountPosts: authResolver(
      async (_, args: CountPostsQueryArgs): Promise<CountPostsResponse> => {
        const { cursor } = args;

        try {
          const query = await getManager()
            .createQueryBuilder(Post, 'posts')
            .limit(40)
            .orderBy('posts.created_at', 'DESC')
            .addOrderBy('posts.id', 'DESC');

          if (cursor) {
            const post = await getRepository(Post).findOne({ id: cursor });

            if (!post) {
              return {
                ok: false,
                error: 'Does not exists post',
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
      }
    ),
  },
};

export default resolvers;
