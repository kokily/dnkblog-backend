export const typeDefs = ["type MeType {\n  id: ID!\n  username: String!\n  email: String\n  profile: String\n  admin: Boolean!\n  githubId: String\n  googleId: String\n}\n\ntype CheckMeResponse {\n  ok: Boolean!\n  error: String\n  user: MeType\n}\n\ntype Query {\n  CheckMe: CheckMeResponse!\n}\n\ntype LoginEmailResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  LoginEmail(email: String!, password: String!): LoginEmailResponse!\n  Logout: LogoutResponse!\n  RegisterEmail(username: String!, email: String!, password: String!): RegisterEmailResponse!\n}\n\ntype LogoutResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype RegisterEmailResponse {\n  ok: Boolean!\n  error: String\n}\n\nscalar Date\n\ntype User {\n  id: ID!\n  username: String!\n  email: String\n  password: String\n  profile: String\n  admin: Boolean!\n  verify_key: String\n  verified: Boolean!\n  githubId: String\n  googleId: String\n  token_version: Int!\n  created_at: Date\n  updated_at: Date\n}\n"];
/* tslint:disable */

export interface Query {
  CheckMe: CheckMeResponse;
}

export interface CheckMeResponse {
  ok: boolean;
  error: string | null;
  user: MeType | null;
}

export interface MeType {
  id: string;
  username: string;
  email: string | null;
  profile: string | null;
  admin: boolean;
  githubId: string | null;
  googleId: string | null;
}

export interface Mutation {
  LoginEmail: LoginEmailResponse;
  Logout: LogoutResponse;
  RegisterEmail: RegisterEmailResponse;
}

export interface LoginEmailMutationArgs {
  email: string;
  password: string;
}

export interface RegisterEmailMutationArgs {
  username: string;
  email: string;
  password: string;
}

export interface LoginEmailResponse {
  ok: boolean;
  error: string | null;
}

export interface LogoutResponse {
  ok: boolean;
  error: string | null;
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
  token_version: number;
  created_at: Date | null;
  updated_at: Date | null;
}
