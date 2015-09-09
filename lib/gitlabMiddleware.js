import connect from 'connect'
import objectKind from './filter/objectKind'
import DoubleTransmission from './filter/DoubleTransmission'
import Suppress from './filter/Suppress'
import debugRequest from './filter/debugRequest'
import ignoreResponse from './provider/ignoreResponse'
import gitlabInfo from './filter/gitlabInfo'
import postChatwork from './filter/postChatwork'
import format from './filter/format'
import okResponse from './provider/okResponse'


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
  .use(format)
  .use(postChatwork)
  .use(okResponse)

export default gitlabMiddleware
