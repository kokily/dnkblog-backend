import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { AddCommentMutationArgs, AddCommentResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import authResolver from '../../../libs/utils/authenticate';
import Comment from '../../../entities/Comment';

const resolvers: Resolvers = {
  Mutation: {
    AddComment: authResolver(
      async (
        _,
        args: AddCommentMutationArgs,
        { ctx }: { ctx: Context }
      ): Promise<AddCommentResponse> => {
        const { userId, username, profile } = ctx.state.user;

        try {
          const comment = await getRepository(Comment).create({
            ...args,
            userId,
            username,
            profile,
          });

          await comment.save();

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
