import enchantGitlabInfo from './enchant-gitlab-info'
import debug from 'debug'

export default function(req, res, next) {
  enchantGitlabInfo(req.objectKind, req.body)
    .catch((err) => gitlabApiError(res, err))
    .then(() => next())
}

function gitlabApiError(res, err) {
  debug('result')(err)
  res.statusCode = 404
  res.end('Gitlab API NG : ' + err)
}
