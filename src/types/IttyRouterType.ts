import { GenericTraps } from './GenericTraps'
import { IRequest } from './IRequest'
import { RequestLike } from './RequestLike'
import { Route } from './Route'
import { RouteEntry } from './RouteEntry'
import { CustomRoutes } from './CustomRoutes'

export type IttyRouterType<
  RequestType = IRequest,
  Args extends any[] = any[],
  ResponseType = any,
  GlobalRequestType = RequestType,
> = {
  __proto__: IttyRouterType<RequestType, Args, ResponseType>
  routes: RouteEntry[]
  fetch: <A extends any[] = Args>(request: RequestLike, ...extra: A) => Promise<ResponseType>
  all: Route<GlobalRequestType, Args>
  delete: Route<GlobalRequestType, Args>
  get: Route<GlobalRequestType, Args>
  head: Route<GlobalRequestType, Args>
  options: Route<GlobalRequestType, Args>
  patch: Route<GlobalRequestType, Args>
  post: Route<GlobalRequestType, Args>
  put: Route<GlobalRequestType, Args>
} & CustomRoutes<Route<GlobalRequestType, Args>> & GenericTraps
