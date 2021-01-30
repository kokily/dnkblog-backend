import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { UpdateReplyMutationArgs, UpdateReplyResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import { cleanNullArgs } from '../../../libs/utils';
import authResolver from '../../../libs/utils/authenticate';
import Reply from '../../../entities/Reply';

const resolvers: Resolvers = {
  Mutation: {
    UpdateReply: authResolver(
      async (
        _,
        args: UpdateReplyMutationArgs,
        { ctx }: { ctx: Context }
      ): Promise<UpdateReplyResponse> => {
        const { userId } = ctx.state.user;
        const { id } = args;

        try {
          const reply = await getRepository(Reply).findOne(id);

          if (!reply) {
            return {
              ok: false,
              error: 'Bad Request',
            };
          } else {
            if (reply.userId === userId) {
              const notNull = cleanNullArgs(args);

              await getRepository(Reply).update(
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
