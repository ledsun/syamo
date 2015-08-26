import _ from 'underscore'

let ignoreFilters = {
  push: (body) => {
    // ブランチの追加削除時はコミットのないpushが通知される。
    if (body.total_commits_count > 0) {} else {
      return {
        detail: 'because no commit push.'
      }
    }
  },
  issue: new CheckIssue(),
  merge_request: (body) => {
    // マージリクエストはstatusがuncheckedとcan_be_mergedで2~3個ずつ通知される。
    // can_be_merged以外を無視します。
    // Accept Mergeの時にも3個通知されるのでstate:opend以外を無視する。
    if (body.object_attributes.state !== 'opened' || body.object_attributes.merge_status !== 'can_be_merged') {
      return {
        detail: 'because mr is not opend and not can_be_merged.'
      }
    }
  }
}

// 無視するときは結果オブジェクトをそれ以外の場合はfalseを返す。
export default function(req, res, next) {
  let isIgnore = ignoreFilters[req.objectKind] && ignoreFilters[req.objectKind](req.body, req.params.chatId)

  // 無視するときはオブジェクトを設定
  req.objectKind = isIgnore ? isIgnore : req.objectKind

  next()
}

function CheckIssue() {
  // IssueはClose/Reopenすると全く同じ内容で２つずつ通知される。
  let abt = new AvoidingDoubleTransmission()

  return (body, chatId) => abt(body, chatId, ignoreUpdate)

  // assignを変更するたびに通知してくるので、updateは無視
  function ignoreUpdate(body) {
    if (body.object_attributes.action === 'update') {
      return {
        detail: 'action is update ' + JSON.stringify(body)
      }
    }
  }
}

// 直前と同じ場合は無視します。
function AvoidingDoubleTransmission() {
  let prevBody = {}

  return (body, chatId, next) => {
    if (!_.isEqual(body, prevBody[chatId])) {
      prevBody[chatId] = body
      return next(body)
    } else {
      return {
        detail: 'because same notification ' + JSON.stringify(body)
      }
    }
  }
}
