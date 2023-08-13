import { getUser } from '../controller/app.controller'
async function queryUserDetails(obj, args, context) {
  let { request, response } = context
  request.body = args['request']
  return await getUser(request, response)
}

const resolvers = {
  Query: {
    queryUserDetails: queryUserDetails,
  },
}

export default resolvers
