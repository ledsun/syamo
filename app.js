import connect from 'connect'
import bodyParser from 'body-parser'
import connectRoute from 'connect-route'
import objectKindParser from './lib/objectKindParser'
import gitlab from './lib/gitlab'

import checkIgnore from './lib/check-ignore'
import AvoidingDoubleTransmission from './lib/AvoidingDoubleTransmission'

let gitlabMiddleware = connect()
  .use(objectKindParser)
  .use(new AvoidingDoubleTransmission())
  .use(checkIgnore)
  .use(gitlab)

connect()
  .use(bodyParser.json())
  .use(connectRoute(router => router.post('/gitlab/:chatId', gitlabMiddleware)))
  .listen(process.env.PORT || 3000);
