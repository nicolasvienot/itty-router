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
