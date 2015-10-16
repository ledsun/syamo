import hogan from 'hogan.js'
import fs from 'fs'
import path from 'path'
import assert from 'power-assert'

export default function(objectKind, chatId) {
  assert(typeof objectKind === 'string', 'objectKind MUST be instance of string.')

  // hoganは実行コンテキストに自己参照が必要です。自身をbindします。
  let templateFileName = toTemplateFilenames(objectKind, chatId),
    existsFiles = existsFileFilter(templateFileName),
    template

  if (anyFile(existsFiles)) {
    template = readFirstFile(existsFiles)
  } else {
    template = noTemplate(objectKind)
  }

  let formatter = hogan.compile(template)

  return formatter.render.bind(formatter)
}

function toTemplateFilenames(objectKind, chatId) {
  return [
    path.join('./template/', objectKind + '.' + chatId + '.mustache'),
    path.join('./template/', objectKind + '.mustache')
  ]
}

function existsFileFilter(files) {
  return files.filter(fs.existsSync)
}

function anyFile(existsFiles) {
  return existsFiles.length > 0
}

function noTemplate(objectKind) {
  return 'no ' + objectKind + '.mustache template! {{{json}}}'
}

function readFirstFile(existsFiles) {
  return fs.readFileSync(existsFiles[0], 'utf8')
}
