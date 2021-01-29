export const typeDefs = ["type MeType {\n  id: ID!\n  username: String!\n  email: String\n  profile: String\n  admin: Boolean!\n  githubId: String\n  googleId: String\n}\n\ntype CheckMeResponse {\n  ok: Boolean!\n  error: String\n  user: MeType\n}\n\ntype Query {\n  CheckMe: CheckMeResponse!\n  AllPosts(title: String, cursor: ID): AllPostsResponse!\n  CategoryPosts(cursor: ID, category: String!): CategoryPostsResponse!\n  DivideCategory: DivideCategoryResponse!\n  ReadPost(id: ID!): ReadPostResponse!\n  TagPosts(cursor: ID, tag: String!): TagPostsResponse!\n  TopTagsList: TopTagsListResponse!\n}\n\ntype LoginEmailResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  LoginEmail(email: String!, password: String!): LoginEmailResponse!\n  Logout: LogoutResponse!\n  RegisterEmail(username: String!, email: String!, password: String!): RegisterEmailResponse!\n  AddPost(category: String!, title: String!, body: String!, thumbnail: String, tags: [String]!): AddPostResponse!\n  RemovePost(id: ID!): RemovePostResponse!\n  UpdatePost(id: ID!, category: String, title: String, body: String, thumbnail: String, tags: [String]): UpdatePostResponse!\n}\n\ntype LogoutResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype RegisterEmailResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype AddPostResponse {\n  ok: Boolean!\n  error: String\n  post: Post\n}\n\ntype AllPostsResponse {\n  ok: Boolean!\n  error: String\n  posts: [Post]\n}\n\ntype CategoryPostsResponse {\n  ok: Boolean!\n  error: String\n  posts: [Post]\n}\n\ntype DivideCategoryResponse {\n  ok: Boolean!\n  error: String\n  categories: [Category]\n}\n\ntype ReadPostResponse {\n  ok: Boolean!\n  error: String\n  post: Post\n}\n\ntype RemovePostResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype TagPostsResponse {\n  ok: Boolean!\n  error: String\n  posts: [Post]\n}\n\ntype UpdatePostResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Category {\n  name: String!\n}\n\ntype Comment {\n  id: ID!\n  body: String!\n  deleted: Boolean!\n  created_at: Date!\n  updated_at: Date\n  userId: String\n  username: String\n  profile: String\n  postId: String\n  replies: [Reply]!\n}\n\ntype Post {\n  id: ID!\n  category: String!\n  title: String!\n  body: String!\n  thumbnail: String\n  tags: [String]!\n  created_at: Date!\n  updated_at: Date\n  comments: [Comment]\n  replies: [Reply]\n}\n\ntype Reply {\n  id: ID!\n  body: String!\n  deleted: Boolean!\n  created_at: Date!\n  updated_at: Date\n  userId: String\n  username: String\n  profile: String\n  postId: String\n  commentId: String\n}\n\ntype Tag {\n  id: ID!\n  name: String!\n  count: Int!\n  created_at: Date!\n}\n\nscalar Date\n\ntype User {\n  id: ID!\n  username: String!\n  email: String\n  password: String\n  profile: String\n  admin: Boolean!\n  verify_key: String\n  verified: Boolean!\n  githubId: String\n  googleId: String\n  created_at: Date\n  updated_at: Date\n  comments: [Comment]\n  replies: [Reply]\n}\n\ntype TopTagsListResponse {\n  ok: Boolean!\n  error: String\n  tags: [Tag]\n  all_count: Int!\n}\n"];
/* tslint:disable */

export interface Query {
  CheckMe: CheckMeResponse;
  AllPosts: AllPostsResponse;
  CategoryPosts: CategoryPostsResponse;
  DivideCategory: DivideCategoryResponse;
  ReadPost: ReadPostResponse;
  TagPosts: TagPostsResponse;
  TopTagsList: TopTagsListResponse;
}

export interface AllPostsQueryArgs {
  title: string | null;
  cursor: string | null;
}

export interface CategoryPostsQueryArgs {
  cursor: string | null;
  category: string;
}

export interface ReadPostQueryArgs {
  id: string;
}

export interface TagPostsQueryArgs {
  cursor: string | null;
  tag: string;
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

export interface AllPostsResponse {
  ok: boolean;
  error: string | null;
  posts: Array<Post> | null;
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
  comments: Array<Comment> | null;
  replies: Array<Reply> | null;
}

export type Date = any;

export interface Comment {
  id: string;
  body: string;
  deleted: boolean;
  created_at: Date;
  updated_at: Date | null;
  userId: string | null;
  username: string | null;
  profile: string | null;
  postId: string | null;
  replies: Array<Reply>;
}

export interface Reply {
  id: string;
  body: string;
  deleted: boolean;
  created_at: Date;
  updated_at: Date | null;
  userId: string | null;
  username: string | null;
  profile: string | null;
  postId: string | null;
  commentId: string | null;
}

export interface CategoryPostsResponse {
  ok: boolean;
  error: string | null;
  posts: Array<Post> | null;
}

export interface DivideCategoryResponse {
  ok: boolean;
  error: string | null;
  categories: Array<Category> | null;
}

export interface Category {
  name: string;
}

export interface ReadPostResponse {
  ok: boolean;
  error: string | null;
  post: Post | null;
}

export interface TagPostsResponse {
  ok: boolean;
  error: string | null;
  posts: Array<Post> | null;
}

export interface TopTagsListResponse {
  ok: boolean;
  error: string | null;
  tags: Array<Tag> | null;
  all_count: number;
}

export interface Tag {
  id: string;
  name: string;
  count: number;
  created_at: Date;
}

export interface Mutation {
  LoginEmail: LoginEmailResponse;
  Logout: LogoutResponse;
  RegisterEmail: RegisterEmailResponse;
  AddPost: AddPostResponse;
  RemovePost: RemovePostResponse;
  UpdatePost: UpdatePostResponse;
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

export interface RemovePostMutationArgs {
  id: string;
}

export interface UpdatePostMutationArgs {
  id: string;
  category: string | null;
  title: string | null;
  body: string | null;
  thumbnail: string | null;
  tags: Array<string> | null;
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

export interface RemovePostResponse {
  ok: boolean;
  error: string | null;
}

export interface UpdatePostResponse {
  ok: boolean;
  error: string | null;
}

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
  created_at: Date | null;
  updated_at: Date | null;
  comments: Array<Comment> | null;
  replies: Array<Reply> | null;
}
