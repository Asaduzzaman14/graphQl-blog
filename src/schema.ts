export const typeDefs = `#graphql

  type Query{
    me: User
    users: [User]
    posts: [Post]
  }

type Mutation {
  signup(
      name: String!,
      email: String!,
      password: String!
      bio: String!
    ):  AuthPaylode
    
    signin(
      email: String!
      password: String!
    ): AuthPaylode

    addPost(post: PostInput!): PostPaylode
    updatePost(postId: ID!, post: PostInput): PostPaylode


  }


type Post {
  id: ID!
  title: String!
  content: String
  author: User
  createdAt: String
  published: Boolean!
}

  type User {
    id: ID!
    name: String
    email: String
    createdAt: String
    posts: [Post]
 
  }

  type Profile {
    id: ID!
    bio: String
    createdAt: String
    user: User!

  }


  type PostPaylode {
    userError: String
    post: Post
  }
  type AuthPaylode {
    userError: String
    token: String
  }

  input PostInput {
    title: String
    content: String
  }


  
`;
