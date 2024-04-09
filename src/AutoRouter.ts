import { Router } from './Router'
import { error } from './error'
import { json } from './json'
import { AutoRouterOptions, AutoRouterType, IRequest } from './types'
import { withParams as wp } from './withParams'

export const AutoRouter = <
  RequestType extends IRequest = IRequest,
  Args extends any[] = any[],
  ResponseType = any
>({
  format = json,
  missing = () => error(404),
  finally: f = [],
  withParams = wp,
  before = [],
  ...options }: AutoRouterOptions = {}
): AutoRouterType<RequestType, Args, ResponseType> => Router({
  before: [
    withParams,
    ...before
  ],
  catch: error,
  finally: [
    (r: any, ...args) => r ?? missing(r, ...args),
    format,
    ...f,
  ],
  ...options,
})
