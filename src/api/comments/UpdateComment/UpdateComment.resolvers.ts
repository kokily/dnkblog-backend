import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { UpdateCommentMutationArgs, UpdateCommentResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import authResolver from '../../../libs/utils/authenticate';
import { cleanNullArgs } from '../../../libs/utils';
import Comment from '../../../entities/Comment';

const resolvers: Resolvers = {
  Mutation: {
    UpdateComment: authResolver(
      async (
        _,
        args: UpdateCommentMutationArgs,
        { ctx }: { ctx: Context }
      ): Promise<UpdateCommentResponse> => {
        const { userId } = ctx.state.user;
        const { id } = args;

        try {
          const comment = await getRepository(Comment).findOne(id);

          if (!comment) {
            return {
              ok: false,
              error: 'Bad Request',
            };
          } else {
            if (comment.userId === userId) {
              const notNull = cleanNullArgs(args);

              await getRepository(Comment).update(
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
                error: 'Not Permission',
              };
            }
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
