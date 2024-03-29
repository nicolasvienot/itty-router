import { Router } from './Router'
import { error } from './error'
import { json } from './json'
import { AutoRouterOptions } from './types'
import { withParams } from './withParams'

export const AutoRouter = ({
  format = json,
  missing = () => error(404),
  finally: f = [],
  before = [],
  ...options }: AutoRouterOptions = {}
) => Router({
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
