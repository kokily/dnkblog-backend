import { getRepository } from 'typeorm';
import { RegisterEmailMutationArgs, RegisterEmailResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import sendMail from '../../../libs/utils/sendMail';
import User from '../../../entities/User';

const resolvers: Resolvers = {
  Mutation: {
    RegisterEmail: async (
      _,
      args: RegisterEmailMutationArgs
    ): Promise<RegisterEmailResponse> => {
      const { username, email, password } = args;
      let admin = false;

      try {
        const exists = await getRepository(User).findOne({ email });

        if (exists) {
          return {
            ok: false,
            error: '이미 가입된 이메일입니다.',
          };
        }

        if (username === process.env.ADMIN!) {
          admin = true;
        }

        const verify_key = await sendMail({ email, username });
        const user = await getRepository(User).create({
          ...args,
          admin,
          verify_key,
        });

        await user.setPassword(password);
        await user.save();

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
    },
  },
};

export default resolvers;
