import assert from 'power-assert'
import request from 'superagent'
import pushData from './pushData'

describe('An authentication', () => {
  it('is errer by chatroom.', (done) => {
    request
      .post('http://localhost:3000/gitlab/1')
      .send(pushData)
      .end((err, res) => {
        assert.notEqual(err, null)
        assert.equal(err.status, 500)
        assert.equal(res.text, "ChatWork NG : You don't have permission to send messages in this room")
        done()
      })
  })
})
