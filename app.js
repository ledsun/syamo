import connect from 'connect'
import bodyParser from 'body-parser'
import connectRoute from 'connect-route'
import objectKindParser from './lib/objectKindParser'
import gitlab from './lib/gitlab'

let gitlabMiddleware = connect()
  .use(objectKindParser)
  .use(gitlab)

connect()
  .use(bodyParser.json())
  .use(connectRoute(router => router.post('/gitlab/:chatId', gitlabMiddleware)))
  .listen(process.env.PORT || 3000);
