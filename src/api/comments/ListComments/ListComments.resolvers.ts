import { getManager } from 'typeorm';
import { ListCommentsQueryArgs, ListCommentsResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import Comment from '../../../entities/Comment';

const resolvers: Resolvers = {
  Query: {
    ListComments: async (
      _,
      args: ListCommentsQueryArgs
    ): Promise<ListCommentsResponse> => {
      const { postId } = args;

      try {
        const query = await getManager()
          .createQueryBuilder(Comment, 'comment')
          .leftJoinAndSelect('comment.replies', 'reply')
          .where('comment.postId = :postId', { postId })
          .orderBy('comment.created_at', 'ASC');

        const comments = await query.getMany();

        return {
          ok: true,
          error: null,
          comments,
        };
      } catch (err) {
        return {
          ok: false,
          error: err.message,
          comments: null,
        };
      }
    },
  },
};

export default resolvers;
