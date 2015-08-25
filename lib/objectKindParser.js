import _ from 'underscore'
import checkIgnore from './check-ignore'

export default function(req, res, next) {
  req.objectKind = getObjectKind(req.body, req.params.chatId)
  next()
}

// 通知オブジェクトの種別を示す文字列を返します。
// 無視するときはオブジェクトを返す。
function getObjectKind(body, chatId) {
  let objectKind = toObjectKind(body),
    isIgnore = checkIgnore(objectKind, body, chatId)

  return isIgnore ? isIgnore : objectKind;
};

// pushにはobject_kindが無いので追加します
function toObjectKind(body) {
  return body.object_kind ? body.object_kind : 'push';
}
