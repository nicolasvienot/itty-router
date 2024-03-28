export type GenericTraps = Record<string, any>

export type RequestLike = {
  method: string
  url: string
} & GenericTraps

export type IRequestStrict = {
  method: string
  url: string
  route: string
  params: {
    [key: string]: string
  }
  query: {
    [key: string]: string | string[] | undefined
  }
  proxy?: any
} & Request

export type IRequest = IRequestStrict & GenericTraps

export type IttyRouterOptions = {
  base?: string
  routes?: RouteEntry[]
} & Record<string, any>

export type RequestHandler<R = IRequest, Args extends Array<any> = any[]> =
  (request: R, ...args: Args) => any

export type RouteEntry = [
  httpMethod: string,
  match: RegExp,
  handlers: RequestHandler[],
  path?: string,
]

// this is the generic "Route", which allows per-route overrides
export type Route<R = IRequest, A extends Array<any> = any[]> = <RequestType = R, Args extends Array<any> = A>(
  path: string,
  ...handlers: RequestHandler<RequestType, Args>[]
) => IttyRouterType<RequestType, Args>

export type CustomRoutes<R = Route> = {
  [key: string]: R
}

export type IttyRouterType<R = IRequest, A extends any[] = any[], Output = any> = {
  __proto__: IttyRouterType<R>
  routes: RouteEntry[]
  fetch: <Args extends any[] = A>(request: RequestLike, ...extra: Args) => Promise<Output>
  all: Route<R, A>
  delete: Route<R, A>
  get: Route<R, A>
  head: Route<R, A>
  options: Route<R, A>
  patch: Route<R, A>
  post: Route<R, A>
  put: Route<R, A>
} & CustomRoutes<Route<R, A>>

export type ResponseHandler<ResponseType = Response, RequestType = IRequest, Args extends any[] = any[]> =
    (response: ResponseType & any, request: RequestType & any, ...args: Args) => any

export type ErrorHandler<ErrorType = Error, RequestType = IRequest, Args extends any[] = any[]> =
    (response: ErrorType, request: RequestType, ...args: Args) => any

export type RouterType<R = IRequest, Args extends any[] = any[]> = {
  before?: RequestHandler<any>[]
  catch?: ErrorHandler
  finally?: ResponseHandler[]
} & IttyRouterType<R, Args>

export type RouterOptions = {
  before?: RequestHandler<any>[]
  catch?: ErrorHandler
  finally?: ResponseHandler[]
} & IttyRouterOptions

export type AutoRouterOptions = {
  missing?: RequestHandler
  format?: ResponseHandler
} & RouterOptions
