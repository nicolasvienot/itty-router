import { RouteEntry } from './RouteEntry'

export type IttyRouterOptions = {
  base?: string
  routes?: RouteEntry[]
} & Record<string, any>
