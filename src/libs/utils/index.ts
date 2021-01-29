import User from '../../entities/User';

export function serializeUser(data): User {
  delete data.password;
  return data;
}

export const cleanNullArgs = (args: object): object => {
  const notNull = {};

  Object.keys(args).forEach((key) => {
    if (args[key] !== null) {
      notNull[key] = args[key];
    }
  });

  return notNull;
};
