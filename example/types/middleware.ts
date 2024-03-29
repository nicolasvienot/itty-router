import { IRequestStrict, IRequest, RequestHandler } from '../../src/types'
import { IttyRouter } from 'IttyRouter'

type UserRequest = {
  user: string
} & IRequestStrict

const router = IttyRouter<IRequestStrict>()

const withUser: RequestHandler = (request) => {
  request.user = 'Kevin'
}

router
  // upstream request sees the request as IRequest (default), so anything goes
  .get('/', (request) => {
    request.user = 123 // not OK
  })

  // then we add the middleware defined above as <UserRequest>
  .all('*', withUser, (request) => {
    request.user = 'Kevin'
    request.user = 123  // NOT ok
  })

  // and if we ever need to restore control, add the generic back in
  .get<UserRequest, []>('/', (request) => {
    request.user = 'Kevin'
    request.user = 123  // NOT ok
  })

  .get('/', (request) => {
    request.user = 'Kevin' // still ok
    request.user = 123  // NOT ok
  })

  router.get('/', (request) => {
    request.user = 123 // NOT ok
  })

export default router
