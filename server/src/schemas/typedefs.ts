const typeDefs = `
type User {
  _id: ID!
  username: String!
  email: String!
}

type Resource {
  _id: ID!
  title: String!
  description: String!
  url: String
}

type Category {
  _id: ID!
  language: String!
  description: String
}

type Auth {
  token: String!
  user: User
}

type Query {
  getSingleUser: User
}

type Mutation {
  createUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  deleteUser: Auth
  #updateUser(password: String!): User
  
  deleteResource(_id: ID!): Resource
  createResource(title: String!, description: String!, url: String): Resource
  
}
`;

export default typeDefs;
