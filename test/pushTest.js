import assert from 'power-assert'
import request from 'superagent'
import pushData from './pushData'

const pushBranch = {
  'before': '0000000000000000000000000000000000000000',
  'after': '9b298340f13114aaf2b1990c95f4c6370ac8e44d',
  'ref': 'refs/heads/add_issue_info',
  'user_id': 6,
  'user_name': 'shigeru.nakajima',
  'project_id': 65,
  'repository': {
    'name': 'chabot',
    'url': 'git@developer.luxiar.jp:shigeru.nakajima/chabot.git',
    'description': 'gitlabにpushされたらchatworkに書き込むアプリを作ります。\r\nhttp://c-note.chatwork.com/post/69274738468/chabot を参考にします。',
    'homepage': 'https://developer.luxiar.jp/shigeru.nakajima/chabot'
  },
  'commits': [],
  'total_commits_count': 0
}

describe('Push', () => {
  it('is ok.', (done) => {
    request
      .post('http://localhost:3000/gitlab/20105295')
      .send(pushData)
      .end((err, res) => {
        assert.equal(err, null)
        assert.equal(res.status, 200)
        assert.equal(res.text, 'OK')
        done()
      })
  })

  it('is ignored by total_commits_count 0', (done) => {
    request
      .post('http://localhost:3000/gitlab/20105295')
      .send(pushBranch)
      .end((err, res) => {
        assert.equal(err, null)
        assert.equal(res.status, 200)
        assert.equal(res.text, 'Ignore')
        done()
      })
  })
})
