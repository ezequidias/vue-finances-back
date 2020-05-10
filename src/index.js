const { GraphQLServer } = require('graphql-yoga')
const Binding = require('prisma-binding')
const { prisma } = require('./generated/prisma-client')

const { endpoint, origin, playground, secret } = require('./config')
const resolvers = require('./resolvers')

// async function main() {

//   await prisma.createUser({
//     name: 'Ezequiel Dias',
//     email: 'ezequidias@outlook.com',
//     password: '123456'
//   })

//   const users = await prisma.users()

//   console.log('Users: ', users)

// }

// main().catch(e => console.error(e))

const server = new GraphQLServer({
  typeDefs:  `${__dirname}/schema.graphql`,
  resolvers,
  context: request => ({
    ...request,
    db: new Binding.Prisma({
      typeDefs: `${__dirname}/generated/graphql-schema/prisma.graphql`,
      endpoint,
      secret
    }),
    prisma
  })
})

server.start({
  playground,
  cors: {
    origin
  }
}).then(() => console.log('Server running on http://localhost:4000...'))