import assert from 'power-assert'
import request from 'superagent'
import pushData from './pushData'

describe('A template', () => {
  it('is used for the chatroom.', (done) => {
    request
      .post('http://localhost:3000/gitlab/20003286')
      .send(pushData)
      .end((err, res) => {
        assert.equal(err, null)
        assert.equal(res.status, 200)
        assert.equal(res.text, 'OK')
        done()
      })
  })
})
