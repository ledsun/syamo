import connect from 'connect'
import bodyParser from 'body-parser'
import connectRoute from 'connect-route'

import objectKindParser from './lib/objectKindParser'
import AvoidingDoubleTransmission from './lib/AvoidingDoubleTransmission'
import suppressor from './lib/suppressor'
import debug from './lib/debug'
import sendIgnore from './lib/sendIgnore'
import sendMessage from './lib/sendMessage'
import sendOK from './lib/sendOK'


let gitlabMiddleware = connect()
  .use(objectKindParser)
  .use(new AvoidingDoubleTransmission())
  .use(suppressor)
  .use(debug)
  .use(sendIgnore)
  .use(sendMessage)
  .use(sendOK)

connect()
  .use(bodyParser.json())
  .use(connectRoute(router => router.post('/gitlab/:chatId', gitlabMiddleware)))
  .listen(process.env.PORT || 3000);
