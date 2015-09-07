import connect from 'connect'
import objectKindParser from './objectKindParser'
import AvoidingDoubleTransmission from './AvoidingDoubleTransmission'
import suppressor from './suppressor'
import debug from './debug'
import sendIgnore from './sendIgnore'
import gitlabInfo from './gitlabInfo'
import sendChatwork from './sendChatwork'
import format from './format'
import sendOK from './sendOK'


let gitlabMiddleware = connect()
  .use(objectKindParser)
  .use(new AvoidingDoubleTransmission())
  .use(suppressor)
  .use(debug)
  .use(sendIgnore)
  .use(gitlabInfo)
  .use(format)
  .use(sendChatwork)
  .use(sendOK)

export default gitlabMiddleware
