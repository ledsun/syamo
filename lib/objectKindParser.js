// 通知オブジェクトの種別を示す文字列をobjectKindに設定します。
export default function(req, res, next) {
  req.objectKind = toObjectKind(req.body)
  next()
}

// pushにはobject_kindが無いので追加します
function toObjectKind(body) {
  return body.object_kind ? body.object_kind : 'push';
}
