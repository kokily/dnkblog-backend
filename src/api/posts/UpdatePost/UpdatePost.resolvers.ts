import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { UpdatePostMutationArgs, UpdatePostResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import authResolver from '../../../libs/utils/authenticate';
import { cleanNullArgs } from '../../../libs/utils';
import Post from '../../../entities/Post';

const resolvers: Resolvers = {
  Mutation: {
    UpdatePost: authResolver(
      async (
        _,
        args: UpdatePostMutationArgs,
        { ctx }: { ctx: Context }
      ): Promise<UpdatePostResponse> => {
        const { admin } = ctx.state.user;
        const { id, body } = args;

        try {
          if (admin) {
            const notNull = cleanNullArgs(args);

            await getRepository(Post).update(
              { id },
              { ...notNull, updated_at: new Date() }
            );

            return {
              ok: true,
              error: null,
            };
          } else {
            return {
              ok: false,
              error: 'Dont need Permission',
            };
          }
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
