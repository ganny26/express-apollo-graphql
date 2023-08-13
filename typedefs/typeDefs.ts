const typeDefs = `
input QueryUserRequest{
  id: String!
}

type UserResponse {
  id: Int
  name: String
  role: String
  org: String
}

type QueryUserResponse{
  success: Boolean
  errors: ErrorInfo
  user: UserResponse
}

type ErrorInfo{
  code:String
  message:String
}

type Query {
  queryUserDetails(request:QueryUserRequest): QueryUserResponse
}

`
export default typeDefs
