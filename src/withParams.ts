import { IRequest } from './types'

export const withParams = (request: IRequest): void => {
  request.raw = request.raw ?? request  // places reference to request in request.raw if safe to do so
  request.proxy = new Proxy(request.proxy ?? request, {
    get: (obj, prop, receiver) =>
            obj[prop]?.bind?.(request)  // if prop exists (as function), return the function, bound to the original request
            ?? obj[prop]                // if prop exists, return it
            ?? obj?.params?.[prop]      // if no prop exists, try the params object
  })
}
