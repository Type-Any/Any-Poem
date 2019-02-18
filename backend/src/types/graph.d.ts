export const typeDefs = ["type DeleteCommentResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  DeleteComment(commentId: Int!): DeleteCommentResponse!\n  SaveComment(poemId: Int!, parentId: Int, text: String): SaveCommentResponse!\n  UpdateComment(commentId: Int!, text: String): UpdateCommentResponse!\n  LikeComment(commentId: Int!): UpdateCommentResponse!\n  DeletePoem(poemId: Int!): DeletePoemResponse!\n  SavePoem(title: String!, text: String!): SavePoemResponse!\n  UpdatePoem(poemId: Int!, title: String, text: String, isPublished: Boolean): SavePoemResponse!\n  LikePoem(poemId: Int!): UpdatePoemResponse!\n  EmailSignIn(email: String!, password: String!): EmailSignInResponse!\n  EmailSignUp(email: String!, password: String!, fullName: String!, penName: String!): EmailSignUpResponse!\n}\n\ntype SaveCommentResponse {\n  ok: Boolean!\n  error: String\n  comment: Comment\n}\n\ntype UpdateCommentResponse {\n  ok: Boolean!\n  error: String\n  comment: Comment\n}\n\ntype GetCommentsResponse {\n  ok: Boolean!\n  error: String\n  comments: [Comment]\n}\n\ntype Query {\n  GetComments(poemId: Int!, skip: Int!, take: Int!): GetCommentsResponse!\n  GetMyPoems(skip: Int!, take: Int!): GetMyPoemsResponse!\n  GetPoem(poemId: Int!): GetPoemResponse!\n  GetPoems(skip: Int!, take: Int!): GetPoemsResponse!\n  GetMyProfile: GetMyProfileResponse!\n}\n\ntype Comment {\n  id: Int!\n  commenter: User!\n  poem: Poem!\n  parent: Comment\n  children: [Comment]\n  text: String!\n  likes: [User]\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype DeletePoemResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype SavePoemResponse {\n  ok: Boolean!\n  error: String\n  poem: Poem\n}\n\ntype UpdatePoemResponse {\n  ok: Boolean!\n  error: String\n  poem: Poem\n}\n\ntype GetMyPoemsResponse {\n  ok: Boolean!\n  error: String\n  poems: [Poem]\n}\n\ntype GetPoemResponse {\n  ok: Boolean!\n  error: String\n  poem: Poem\n}\n\ntype GetPoemsResponse {\n  ok: Boolean!\n  error: String\n  poems: [Poem]\n}\n\ntype Poem {\n  id: Int!\n  poet: User!\n  title: String!\n  text: String!\n  comments: [Comment]\n  likes: [User]\n  isPublished: Boolean!\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype EmailSignInResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype EmailSignUpResponse {\n  ok: Boolean!\n  error: String\n  user: User\n  token: String\n}\n\ntype GetMyProfileResponse {\n  ok: Boolean!\n  error: String\n  profile: User\n}\n\ntype User {\n  id: Int!\n  email: String!\n  password: String!\n  fullName: String!\n  penName: String!\n  bio: String\n  avatar: String\n  createdAt: String!\n  updatedAt: String\n  poems: [Poem]\n  comments: [Comment]\n  followers: [User]\n  following: [User]\n}\n"];
/* tslint:disable */

export interface Query {
  GetComments: GetCommentsResponse;
  GetMyPoems: GetMyPoemsResponse;
  GetPoem: GetPoemResponse;
  GetPoems: GetPoemsResponse;
  GetMyProfile: GetMyProfileResponse;
}

export interface GetCommentsQueryArgs {
  poemId: number;
  skip: number;
  take: number;
}

export interface GetMyPoemsQueryArgs {
  skip: number;
  take: number;
}

export interface GetPoemQueryArgs {
  poemId: number;
}

export interface GetPoemsQueryArgs {
  skip: number;
  take: number;
}

export interface GetCommentsResponse {
  ok: boolean;
  error: string | null;
  comments: Array<Comment> | null;
}

export interface Comment {
  id: number;
  commenter: User;
  poem: Poem;
  parent: Comment | null;
  children: Array<Comment> | null;
  text: string;
  likes: Array<User> | null;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  email: string;
  password: string;
  fullName: string;
  penName: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string | null;
  poems: Array<Poem> | null;
  comments: Array<Comment> | null;
  followers: Array<User> | null;
  following: Array<User> | null;
}

export interface Poem {
  id: number;
  poet: User;
  title: string;
  text: string;
  comments: Array<Comment> | null;
  likes: Array<User> | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetMyPoemsResponse {
  ok: boolean;
  error: string | null;
  poems: Array<Poem> | null;
}

export interface GetPoemResponse {
  ok: boolean;
  error: string | null;
  poem: Poem | null;
}

export interface GetPoemsResponse {
  ok: boolean;
  error: string | null;
  poems: Array<Poem> | null;
}

export interface GetMyProfileResponse {
  ok: boolean;
  error: string | null;
  profile: User | null;
}

export interface Mutation {
  DeleteComment: DeleteCommentResponse;
  SaveComment: SaveCommentResponse;
  UpdateComment: UpdateCommentResponse;
  LikeComment: UpdateCommentResponse;
  DeletePoem: DeletePoemResponse;
  SavePoem: SavePoemResponse;
  UpdatePoem: SavePoemResponse;
  LikePoem: UpdatePoemResponse;
  EmailSignIn: EmailSignInResponse;
  EmailSignUp: EmailSignUpResponse;
}

export interface DeleteCommentMutationArgs {
  commentId: number;
}

export interface SaveCommentMutationArgs {
  poemId: number;
  parentId: number | null;
  text: string | null;
}

export interface UpdateCommentMutationArgs {
  commentId: number;
  text: string | null;
}

export interface LikeCommentMutationArgs {
  commentId: number;
}

export interface DeletePoemMutationArgs {
  poemId: number;
}

export interface SavePoemMutationArgs {
  title: string;
  text: string;
}

export interface UpdatePoemMutationArgs {
  poemId: number;
  title: string | null;
  text: string | null;
  isPublished: boolean | null;
}

export interface LikePoemMutationArgs {
  poemId: number;
}

export interface EmailSignInMutationArgs {
  email: string;
  password: string;
}

export interface EmailSignUpMutationArgs {
  email: string;
  password: string;
  fullName: string;
  penName: string;
}

export interface DeleteCommentResponse {
  ok: boolean;
  error: string | null;
}

export interface SaveCommentResponse {
  ok: boolean;
  error: string | null;
  comment: Comment | null;
}

export interface UpdateCommentResponse {
  ok: boolean;
  error: string | null;
  comment: Comment | null;
}

export interface DeletePoemResponse {
  ok: boolean;
  error: string | null;
}

export interface SavePoemResponse {
  ok: boolean;
  error: string | null;
  poem: Poem | null;
}

export interface UpdatePoemResponse {
  ok: boolean;
  error: string | null;
  poem: Poem | null;
}

export interface EmailSignInResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface EmailSignUpResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
  token: string | null;
}
