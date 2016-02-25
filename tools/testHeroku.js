const request = require('superagent')
const message = require('./message')

if (process.argv.length < 4) {
  console.error('第一引数にアプリケーション名を、第二引数にチャットルームIDを指定してください。')
  process.exit(1)
}

const url = `http://${process.argv[2]}.herokuapp.com/gitlab/${process.argv[3]}`

request
  .post(url)
  .send(message)
  .end(function(err) {
    if (err) {
      console.error(err)
      process.exit(1)
    }

    console.log('OK')
  })
