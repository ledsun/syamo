import connect from 'connect'
import postChatwork from 'conncet-post-chatwork-message'
import objectKind from './filter/objectKind'
import DoubleTransmission from './filter/DoubleTransmission'
import Suppress from './filter/Suppress'
import debugRequest from './filter/debugRequest'
import ignoreResponse from './provider/ignoreResponse'
import gitlabInfo from './filter/gitlabInfo'
import pushBranch from './filter/pushBranch'
import mappingAssignee from './filter/mappingAssignee'
import format from './filter/format'
import okResponse from './provider/okResponse'
import ErrorHandler from './provider/ErrorHandler'

let gitlabMiddleware = connect()
  .use(objectKind)
  .use(new DoubleTransmission())
  .use(new Suppress(
    'push', (body) => body.total_commits_count === 0,
    'No commit push is notified when a branch is add or remove.'
  ))
  .use(new Suppress(
    'issue', (body) => body.object_attributes.action === 'update',
    'Update issue is notified when an assignee is changed by the select box.'
  ))
  .use(new Suppress(
    'issue', (body) => body.object_attributes.action === 'close',
    'A closisg issue is not important.'
  ))
  .use(new Suppress(
    'merge_request', (body) => body.object_attributes.state !== 'opened',
    'MRs are notified 3times whem a mr is merged.'
  ))
  .use(debugRequest)
  .use(ignoreResponse)
  .use(gitlabInfo)
  .use(pushBranch)
  .use(mappingAssignee)
  .use(format)
  .use(new ErrorHandler(500, 'Internal Sever Error'))
  .use(postChatwork(process.env.CHATWORK_TOKEN))
  .use(new ErrorHandler(502, 'Bad Gateway: ChatWork Response'))
  .use(okResponse)

export default gitlabMiddleware
