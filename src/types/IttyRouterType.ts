import { GenericTraps } from './GenericTraps'
import { IRequest } from './IRequest'
import { RequestLike } from './RequestLike'
import { Route } from './Route'
import { RouteEntry } from './RouteEntry'
import { CustomRoutes } from './CustomRoutes'

export type IttyRouterType<R = IRequest, A extends any[] = any[], ResponseType = any> = {
  __proto__: IttyRouterType<R>
  routes: RouteEntry[]
  fetch: <Args extends any[] = A>(request: RequestLike, ...extra: Args) => Promise<ResponseType>
  all: Route<R, A>
  delete: Route<R, A>
  get: Route<R, A>
  head: Route<R, A>
  options: Route<R, A>
  patch: Route<R, A>
  post: Route<R, A>
  put: Route<R, A>
} & CustomRoutes<Route<R, A>> & GenericTraps
