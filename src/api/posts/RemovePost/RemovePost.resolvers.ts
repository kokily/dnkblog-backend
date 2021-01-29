import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { RemovePostMutationArgs, RemovePostResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import authResolver from '../../../libs/utils/authenticate';
import Post from '../../../entities/Post';

const resolvers: Resolvers = {
  Mutation: {
    RemovePost: authResolver(
      async (
        _,
        args: RemovePostMutationArgs,
        { ctx }: { ctx: Context }
      ): Promise<RemovePostResponse> => {
        const { admin } = ctx.state.user;
        const { id } = args;

        try {
          if (admin) {
            await getRepository(Post).delete(id);

            return {
              ok: true,
              error: null,
            };
          } else {
            return {
              ok: false,
              error: 'Dont have Permission',
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
