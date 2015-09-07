import Promise from 'bluebird'
import enchantGitlabInfo from './enchant-gitlab-info'
import sendResultBy from './sendResultBy'

export default function(req, res, next) {
  let result = sendResultBy(res)

  enchantGitlabInfo(req.objectKind, req.body)
    // thenを飛ばして次のcatchへエラーオブジェクトを投げるためPromiseを返します。
    .catch((err) => gitlabApiError(result, err))
    .then(() => next())
}

function gitlabApiError(result, err) {
  let ret = result.make.gitlabNg(err)
  result.send(ret)
}
