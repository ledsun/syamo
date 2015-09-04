import assert from 'power-assert'

// 通知オブジェクトの種別を示す文字列をobjectKindに設定します。
export default function(req, res, next) {
  req.objectKind = toObjectKind(req.body)
  next()
}

// pushにはobject_kindが無いので追加します
function toObjectKind(body) {
  if (body.object_kind) {
    assert(typeof body.object_kind === 'string', 'object_kind MUST be instance of string')
    return body.object_kind
  }

  return 'push'
}
