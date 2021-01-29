import { getManager, getRepository } from 'typeorm';
import { TopTagsListResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import Tag from '../../../entities/Tag';

const resolvers: Resolvers = {
  Query: {
    TopTagsList: async (_, __): Promise<TopTagsListResponse> => {
      try {
        const query = await getManager()
          .createQueryBuilder(Tag, 'tag')
          .limit(5)
          .orderBy('tag.count', 'DESC')
          .addOrderBy('tag.id', 'ASC');

        const tags = await query.getMany();
        const all_count = await getRepository(Tag).count();

        return {
          ok: true,
          error: null,
          tags,
          all_count,
        };
      } catch (err) {
        return {
          ok: false,
          error: err.message,
          tags: null,
          all_count: 0,
        };
      }
    },
  },
};

export default resolvers;
