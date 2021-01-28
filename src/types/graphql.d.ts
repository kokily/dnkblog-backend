export const typeDefs = ["type MeType {\n  id: ID!\n  username: String!\n  email: String\n  profile: String\n  admin: Boolean!\n  githubId: String\n  googleId: String\n}\n\ntype CheckMeResponse {\n  ok: Boolean!\n  error: String\n  user: MeType\n}\n\ntype Query {\n  CheckMe: CheckMeResponse!\n}\n\ntype LoginEmailResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  LoginEmail(email: String!, password: String!): LoginEmailResponse!\n  Logout: LogoutResponse!\n  RegisterEmail(username: String!, email: String!, password: String!): RegisterEmailResponse!\n  AddPost(category: String!, title: String!, body: String!, thumbnail: String, tags: [String]!): AddPostResponse!\n}\n\ntype LogoutResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype RegisterEmailResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype AddPostResponse {\n  ok: Boolean!\n  error: String\n  post: Post\n}\n\ntype Post {\n  id: ID!\n  category: String!\n  title: String!\n  body: String!\n  thumbnail: String\n  tags: [String]!\n  created_at: Date!\n  updated_at: Date\n}\n\nscalar Date\n\ntype User {\n  id: ID!\n  username: String!\n  email: String\n  password: String\n  profile: String\n  admin: Boolean!\n  verify_key: String\n  verified: Boolean!\n  githubId: String\n  googleId: String\n  token_version: Int!\n  created_at: Date\n  updated_at: Date\n}\n"];
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
  AddPost: AddPostResponse;
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

export interface AddPostMutationArgs {
  category: string;
  title: string;
  body: string;
  thumbnail: string | null;
  tags: Array<string>;
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

export interface AddPostResponse {
  ok: boolean;
  error: string | null;
  post: Post | null;
}

export interface Post {
  id: string;
  category: string;
  title: string;
  body: string;
  thumbnail: string | null;
  tags: Array<string>;
  created_at: Date;
  updated_at: Date | null;
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
