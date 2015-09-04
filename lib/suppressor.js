let filters = new Map([
  ['push', noCommit],
  ['issue', updateAction],
  ['merge_request', opendState]
])

// 無視するときは結果オブジェクトをそれ以外の場合はfalseを返す。
export default function(req, res, next) {
  let isIgnore = filters.has(req.objectKind) && filters.get(req.objectKind)(req.body, req.params.chatId)

  // 無視するときはオブジェクトを設定
  if (isIgnore) {
    req.objectKind = isIgnore
  }

  next()
}

function noCommit(body) {
  // ブランチの追加削除時はコミットのないpushが通知される。
  if (body.total_commits_count > 0) {} else {
    return {
      detail: 'because no commit push.'
    }
  }
}

// assignを変更するたびに通知してくるので、updateActionは無視
function updateAction(body) {
  if (body.object_attributes.action === 'update') {
    return {
      detail: 'action is update ' + JSON.stringify(body)
    }
  }
}

function opendState(body) {
  // Accept Mergeの時にも3個通知されるのでstate:opend以外を無視する。
  if (body.object_attributes.state !== 'opened') {
    return {
      detail: 'because mr is not opend and not can_be_merged.'
    }
  }
}
