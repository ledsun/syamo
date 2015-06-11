export default function(objectKind, result) {
  let message = result.make.ignore(objectKind)

  result.send(message)
}
