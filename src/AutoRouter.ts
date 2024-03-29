import { Router } from './Router'
import { error } from './error'
import { json } from './json'
import { AutoRouterOptions, AutoRouterType, RouterType } from './types'
import { withParams } from './withParams'
import { IRequest } from './types'

export const AutoRouter = <
  RequestType extends IRequest = IRequest,
  Args extends any[] = any[],
  ResponseType = any
>({
  format = json,
  missing = () => error(404),
  finally: f = [],
  before = [],
  ...options }: AutoRouterOptions = {}
): RouterType<RequestType, Args, ResponseType> => Router({
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
