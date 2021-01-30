import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { Resolvers } from '../../../types/resolvers';
import { AddReplyMutationArgs, AddReplyResponse } from '../../../types/graphql';
import authResolver from '../../../libs/utils/authenticate';
import Reply from '../../../entities/Reply';

const resolvers: Resolvers = {
  Mutation: {
    AddReply: authResolver(
      async (
        _,
        args: AddReplyMutationArgs,
        { ctx }: { ctx: Context }
      ): Promise<AddReplyResponse> => {
        const { userId, username, profile } = ctx.state.user;

        try {
          const reply = await getRepository(Reply).create({
            ...args,
            userId,
            username,
            profile,
          });

          await reply.save();

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
