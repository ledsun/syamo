// MRのassignee_nameが既知の場合には、チャットワークの通知先IDを設定します。
export default function(req, res, next) {
  if (req.objectKind === 'merge_request') {
    if (req.body.object_attributes.assignee_name === 'shigeru.nakajima') {
      req.body.object_attributes.assignee_chatwark_id = '903097'
    }
  }

  next()
}
