import { IRequest } from './IRequest'
import { RequestHandler } from './RequestHandler'
import { ResponseHandler } from './ResponseHandler'
import { RouterType } from './RouterType'

export type AutoRouterType<
  RequestType = IRequest,
  Args extends any[] = any[],
  ResponseType = any
> = {
  missing?: RequestHandler<RequestType, Args>
  format?: ResponseHandler
} & RouterType<RequestType, Args, ResponseType>
