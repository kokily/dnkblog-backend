import { Context } from 'koa';
import { getManager } from 'typeorm';
import { CountCommentsResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import authResolver from '../../../libs/utils/authenticate';
import Comment from '../../../entities/Comment';
import Reply from '../../../entities/Reply';

const resolvers: Resolvers = {
  Query: {
    CountComments: authResolver(
      async (_, __, { ctx }: { ctx: Context }): Promise<CountCommentsResponse> => {
        const { userId } = ctx.state.user;

        try {
          const comments_num = await getManager()
            .createQueryBuilder(Comment, 'comment')
            .where('comment.userId = :userId', { userId })
            .getCount();

          const replies_num = await getManager()
            .createQueryBuilder(Reply, 'reply')
            .where('reply.userId = :userId', { userId })
            .getCount();

          return {
            ok: true,
            error: null,
            count: {
              comments_num,
              replies_num,
            },
          };
        } catch (err) {
          return {
            ok: false,
            error: err.message,
            count: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
