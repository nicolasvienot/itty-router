import { GenericTraps } from './GenericTraps'
import { RouteEntry } from './RouteEntry'

export type IttyRouterOptions = {
  base?: string
  routes?: RouteEntry[]
} & GenericTraps
