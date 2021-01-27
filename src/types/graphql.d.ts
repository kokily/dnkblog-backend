export const typeDefs = ["type RegisterEmailResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  RegisterEmail(username: String!, email: String!, password: String!): RegisterEmailResponse!\n}\n\ntype Query {\n  temp: String\n  Test: TestResponse!\n}\n\nscalar Date\n\ntype User {\n  id: ID!\n  username: String!\n  email: String\n  password: String\n  profile: String\n  admin: Boolean!\n  verify_key: String\n  verified: Boolean!\n  githubId: String\n  googleId: String\n  refresh_token: String\n  created_at: Date\n  updated_at: Date\n}\n\ntype TestResponse {\n  ok: Boolean!\n  error: String\n}\n"];
/* tslint:disable */

export interface Query {
  temp: string | null;
  Test: TestResponse;
}

export interface TestResponse {
  ok: boolean;
  error: string | null;
}

export interface Mutation {
  RegisterEmail: RegisterEmailResponse;
}

export interface RegisterEmailMutationArgs {
  username: string;
  email: string;
  password: string;
}

export interface RegisterEmailResponse {
  ok: boolean;
  error: string | null;
}

export type Date = any;

export interface User {
  id: string;
  username: string;
  email: string | null;
  password: string | null;
  profile: string | null;
  admin: boolean;
  verify_key: string | null;
  verified: boolean;
  githubId: string | null;
  googleId: string | null;
  refresh_token: string | null;
  created_at: Date | null;
  updated_at: Date | null;
}
