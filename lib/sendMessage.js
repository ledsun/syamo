import enchantGitlabInfo from './enchant-gitlab-info'

export default function(req, res, next) {
  enchantGitlabInfo(req.objectKind, req.body)
    .catch((err) => gitlabApiError(res, err))
    .then(() => next())
}

function gitlabApiError(res, err) {
  console.error(err)
  res.statusCode = 404
  res.end('Gitlab API NG : ' + err)
}
