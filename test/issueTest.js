import assert from 'power-assert'
import request from 'superagent'

const issueData = {
  object_kind: 'issue',
  user: {
    name: 'shigeru.nakajima',
    username: 'shigeru.nakajima',
    avatar_url: 'https://secure.gravatar.com/avatar/3a1f432882d487dfbc0046fbdca602b6?s=40&d=identicon'
  },
  object_attributes: {
    id: 2624,
    title: 'a',
    assignee_id: null,
    author_id: 6,
    project_id: 65,
    created_at: '2015-07-21 10:35:22 UTC',
    updated_at: new Date().toString(),
    position: 0,
    branch_name: null,
    description: 'a\r\nb',
    milestone_id: null,
    state: 'opened',
    iid: 4,
    url: 'https://developer.luxiar.jp/shigeru.nakajima/chabot/issues/4',
    action: 'open'
  }
};

describe('Issue', () => {
  it('is ok.', (done) => {
    request
      .post('http://localhost:3000/gitlab/20105295')
      .send(issueData)
      .end((err, res) => {
        assert.equal(err, null)
        assert.equal(res.status, 200)
        assert.equal(res.text, 'OK')
        done()
      })
  })

  it('is ignored by duplicate.', (done) => {
    request
      .post('http://localhost:3000/gitlab/20105295')
      .send(issueData)
      .end((err, res) => {
        assert.equal(err, null)
        assert.equal(res.status, 200)
        assert.equal(res.text, 'Ignore')
        done()
      })
  })

  it('is not ignored that is sent to other chatroom.', (done) => {
    request
      .post('http://localhost:3000/gitlab/20003286')
      .send(issueData)
      .end((err, res) => {
        assert.equal(err, null)
        assert.equal(res.status, 200)
        assert.equal(res.text, 'OK')
        done()
      })
  })

  it('is ignored by update action.', (done) => {
    request
      .post('http://localhost:3000/gitlab/123456')
      .send(Object.assign({}, issueData, {
        object_attributes: {
          action: 'update'
        }
      }))
      .end((err, res) => {
        assert.equal(err, null)
        assert.equal(res.status, 200)
        assert.equal(res.text, 'Ignore')
        done()
      })
  })

  it('is ignored by close action.', (done) => {
    request
      .post('http://localhost:3000/gitlab/123456')
      .send(Object.assign({}, issueData, {
        object_attributes: {
          action: 'close'
        }
      }))
      .end((err, res) => {
        assert.equal(err, null)
        assert.equal(res.status, 200)
        assert.equal(res.text, 'Ignore')
        done()
      })
  })
})
