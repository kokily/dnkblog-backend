import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { RemoveCommentMutationArgs, RemoveCommentResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import authResolver from '../../../libs/utils/authenticate';
import Comment from '../../../entities/Comment';

const resolvers: Resolvers = {
  Mutation: {
    RemoveComment: authResolver(
      async (
        _,
        args: RemoveCommentMutationArgs,
        { ctx }: { ctx: Context }
      ): Promise<RemoveCommentResponse> => {
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
              await getRepository(Comment).update(
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
