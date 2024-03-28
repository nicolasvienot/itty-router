import { IRequest } from './IRequest'

export type ErrorHandler<ErrorType = Error, RequestType = IRequest, Args extends any[] = any[]> =
    (response: ErrorType, request: RequestType, ...args: Args) => any
