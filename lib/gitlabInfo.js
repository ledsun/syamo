import enchantGitlabInfo from './enchantGitlabInfo'
import debug from 'debug'

export default function(req, res, next) {
  enchantGitlabInfo(req.objectKind, req.body)
    .catch((err) => onError(res, err))
    .then(() => next())
}

function onError(res, err) {
  debug('result')(err)
  res.statusCode = 404
  res.end('Gitlab API NG : ' + err)
}
