const { error } = require("../../dist/index")
const { AutoRouter } = require("../../dist/AutoRouter")
const { createServerAdapter } = require("@whatwg-node/server")
const http = require("http")

const router = AutoRouter({
  catch: (err) => {
    console.log('ERROR', err.message, err.stack)

    return error(500, err.stack)
  }
})

router.get('*', () => "Hello itty-router v5")

const serverAdapter = createServerAdapter(async (request) => {
  // this works

  const url = new URL(request.url)

  console.log({
    url: request.url,
    newURL: url,
    method: request.method,
  })

  request.query = {}
  request.params = {}
  request.route = '/foo'
  request.proxy = new Proxy(request, {})

  const slimRequest = {
    method: request.method,
    url: request.url,
  }

  return await router.fetch(request)
})

const httpServer = http.createServer(serverAdapter)

httpServer.listen(5000)
