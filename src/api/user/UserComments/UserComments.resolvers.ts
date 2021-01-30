import { Context } from 'koa';
import { getManager } from 'typeorm';
import { UserCommentsResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import { serializeUser } from '../../../libs/utils';
import authResolver from '../../../libs/utils/authenticate';
import User from '../../../entities/User';

const resolvers: Resolvers = {
  Query: {
    UserComments: authResolver(
      async (_, __, { ctx }: { ctx: Context }): Promise<UserCommentsResponse> => {
        const { userId } = ctx.state.user;

        try {
          const query = await getManager()
            .createQueryBuilder(User, 'user')
            .leftJoinAndSelect('user.comments', 'comment')
            .leftJoinAndSelect('user.replies', 'reply')
            .where('user.id = :userId', { userId });

          const user = await query.getOne();

          return {
            ok: true,
            error: null,
            user: serializeUser(user),
          };
        } catch (err) {
          return {
            ok: false,
            error: err.message,
            user: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
