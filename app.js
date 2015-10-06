import connect from 'connect'
import bodyParser from 'body-parser'
import connectRoute from 'connect-route'

import gitlabMiddleware from './lib/gitlabMiddleware'

connect()
  .use(bodyParser.json())
  .use('/gitlab', connectRoute(router => router.post('/:chatId', gitlabMiddleware)))
  .listen(process.env.PORT || 3000);
