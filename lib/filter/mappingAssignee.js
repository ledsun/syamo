const map = new Map([
  ['ai.yuichi', '903099'],
  ['kurubushionline', '933045'],
  ['masaomi.tsuge', '903098'],
  ['shigeru.nakajima', '903097'],
  ['yusuke.matsuda', '903099']
])

// MRのassignee_nameが既知の場合には、チャットワークの通知先IDを設定します。
export default function(req, res, next) {
  if (req.objectKind === 'merge_request') {
    if (map.has(req.body.object_attributes.assignee_name)) {
      req.body.object_attributes.assignee_chatwark_id = map.get(req.body.object_attributes.assignee_name)
    }
  }

  next()
}
