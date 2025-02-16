import { IRequestStrict } from './IRequestStrict'

export type HasContent<ContentType> = {
  content: ContentType
} & IRequestStrict
