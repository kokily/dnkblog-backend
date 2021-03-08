import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { AddPostMutationArgs, AddPostResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import authResolver from '../../../libs/utils/authenticate';
import Post from '../../../entities/Post';
import Tag from '../../../entities/Tag';

const resolvers: Resolvers = {
  Mutation: {
    AddPost: authResolver(
      async (
        _,
        args: AddPostMutationArgs,
        { ctx }: { ctx: Context }
      ): Promise<AddPostResponse> => {
        const { user } = ctx.state;
        const { category, title, body, thumbnail, tags } = args;

        try {
          if (user.admin) {
            // Tag Register or Count Up
            tags.map(async (tag) => {
              const exists = await getRepository(Tag).findOne({ name: tag });

              if (exists) {
                await getRepository(Tag).update(
                  { id: exists.id },
                  { count: exists.count + 1 }
                );
              } else {
                const newTag = await getRepository(Tag).create({ name: tag });

                await newTag.save();
              }
            });

            const post = await getRepository(Post).create({
              category,
              title,
              body,
              thumbnail,
              tags,
            });

            await post.save();

            return {
              ok: true,
              error: null,
              post,
            };
          } else {
            return {
              ok: false,
              error: "Don't have permission",
              post: null,
            };
          }
        } catch (err) {
          return {
            ok: false,
            error: err.message,
            post: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
