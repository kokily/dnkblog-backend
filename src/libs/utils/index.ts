import User from '../../entities/User';

export function serializeUser(data): User {
  delete data.password;
  return data;
}
