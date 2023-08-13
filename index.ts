import * as express from 'express'
import * as swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from './swagger.json'
import * as Redis from './utils/redis'
import AppRouter from './routes/app.route'
import * as cors from 'cors'
// Graphql Imports
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import resolvers from './resolvers/user.resolvers'
import typeDefs from './typedefs/typeDefs'
import * as http from 'http'
const app = express()

async function startServer() {
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: process.env.NODE_ENV !== 'production',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })
  await server.start()

  app.use(express.json())
  app.use(Redis.attachRedisClient)
  // Graphql Entry point
  app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({
        // Add optional configuration options
        request: req,
        response: res,
      }),
    })
  )

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

  app.use('/api/', AppRouter)

  httpServer.listen(process.env.PORT || 3000, () => {
    console.log(`server started on 3000!`)
  })
}

startServer()
