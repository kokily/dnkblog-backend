import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { RemoveReplyMutationArgs, RemoveReplyResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import authResolver from '../../../libs/utils/authenticate';
import Reply from '../../../entities/Reply';

const resolvers: Resolvers = {
  Mutation: {
    RemoveReply: authResolver(
      async (
        _,
        args: RemoveReplyMutationArgs,
        { ctx }: { ctx: Context }
      ): Promise<RemoveReplyResponse> => {
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
              await getRepository(Reply).update(
                { id },
                { body: '삭제한 댓글입니다.', deleted: true }
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
