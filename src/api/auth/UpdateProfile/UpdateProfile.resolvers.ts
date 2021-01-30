import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { UpdateProfileMutationArgs, UpdateProfileResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import authResolver from '../../../libs/utils/authenticate';
import User from '../../../entities/User';

const resolvers: Resolvers = {
  Mutation: {
    UpdateProfile: authResolver(
      async (
        _,
        args: UpdateProfileMutationArgs,
        { ctx }: { ctx: Context }
      ): Promise<UpdateProfileResponse> => {
        const { userId } = ctx.state.user;
        const { profile, email } = args;

        try {
          await getRepository(User).update(
            { id: userId },
            {
              profile,
              email,
            }
          );

          return {
            ok: true,
            error: null,
          };
        } catch (err) {
          return {
            ok: false,
            error: err.message,
          };
        }
      }
    ),
  },
};

export default resolvers;
