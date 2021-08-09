/* istanbul ignore file */

const buildRequest = ({
  method = 'GET',
  path,
  url = `https://example.com${path}`,
  ...other
}) => ({ method, path, url, ...other })

const extract = ({ params, query }) => ({ params, query })

const testRoute = async ({
  route,
  path,
  method = 'get',
  returns = true,
  log = false,
}, Router) => {
  const r = []
  const router = Router({ r })
  const handler = jest.fn(req => req.params)

  // register route
  router[method](route, handler)

  log && console.log({
    routes: r,
    route,
    path,
  })

  await router.handle(buildRequest({ method: method.toUpperCase(), path }))

  if (!returns) {
    expect(handler).not.toHaveBeenCalled()
  } else {
    expect(handler).toHaveBeenCalled()

    if (typeof returns === 'object') {
      expect(handler).toHaveReturnedWith(returns)
    }
  }
}

const runTests = (tests, Router) => {
  for (let test of tests) {
    let { route, path, returns = true, description } = test
    const matchNote = returns
                  ? typeof returns === 'object'
                    ? `returns params ${JSON
                                          .stringify(returns)
                                          .replace('{', '{ ')
                                          .replace('}', ' }')
                                          .replace(/"(\w+)":/g, '$1: ')
                                          .replace(',', ', ')} from`
                    : 'matches'
                  : 'does NOT match'
    description = description || `route "${route}" ${matchNote} path "${path}"`

    it(description, async () => {
      await testRoute(test, Router)
    })
  }
}

const createTestRunner = Router => (...args) => runTests(...args, Router)

module.exports = {
  buildRequest,
  createTestRunner,
  extract,
  runTests,
}
