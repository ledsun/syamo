import assert from 'power-assert'
import request from 'superagent'

// プロジェクトIDとマージリクエストIDは環境依存です。
// ユーザがプロジェクトに参加していないが、プロジェクトのグループに参加している場合を再現するために
// https://developer.luxiar.jp/up-frontier/prism のIDを使います。
const mrData = {
    'object_kind': 'merge_request',
    'object_attributes': {
      'id': 445,
      'target_branch': 'master',
      'source_branch': 'ms-viewport',
      'source_project_id': 14,
      'author_id': 2,
      'assignee_id': 6,
      'title': 'MS-Viewport',
      'created_at': '2013-12-03T17:23:34Z',
      'updated_at': '2013-12-03T17:23:34Z',
      'st_commits': null,
      'st_diffs': null,
      'milestone_id': null,
      'state': 'opened',
      'merge_status': 'can_be_merged',
      'target_project_id': 62,
      'iid': 18,
      'description': ' abc & \'hoge\' '
    }
  },
  uncheckedMrData = Object.assign({}, mrData, {
    object_attributes: Object.assign({}, mrData.object_attributes, {
      'merge_status': 'unchecked'
    })
  }),
  mergedMrData = Object.assign({}, mrData, {
    object_attributes: Object.assign({}, mrData.object_attributes, {
      'state': 'merged'
    })
  }),
  unknownMrData = Object.assign({}, mrData, {
    object_attributes: Object.assign({}, mrData.object_attributes, {
      'target_project_id': 14
    })
  })

describe('MR', () => {
  it('is ok.', (done) => {
    request
      .post('http://localhost:3000/gitlab/20003286')
      .send(mrData)
      .end((err, res) => {
        assert.equal(err, null)
        assert.equal(res.status, 200)
        assert.equal(res.text, 'OK')
        done()
      })
  })

  // 2015/08/26
  // 以前は、GitlabがMRのOpen時にuncheckedとcan_be_mergedを二つ送ってきた。
  // can_be_mergedのみを通していた。
  // いつの間にかcan_be_mergedを送って来なくなった。uncheckedを通すことにした。
  it('is through that is unchecked.', (done) => {
    request
      .post('http://localhost:3000/gitlab/20003286')
      .send(uncheckedMrData)
      .end((err, res) => {
        assert.equal(err, null)
        assert.equal(res.status, 200)
        assert.equal(res.text, 'OK')
        done()
      })
  })

  it('is ignored thats status is merged.', (done) => {
    request
      .post('http://localhost:3000/gitlab/20003286')
      .send(mergedMrData)
      .end((err, res) => {
        assert.equal(err, null)
        assert.equal(res.status, 200)
        assert.equal(res.text, 'Ignore')
        done()
      })
  })

  it('is error unless any information from Gitlab API.', (done) => {
    request
      .post('http://localhost:3000/gitlab/20003286')
      .send(unknownMrData)
      .end((err, res) => {
        assert.notEqual(err, null)
        assert.equal(err.status, 404)
        assert.equal(res.text, 'Gitlab API NG : Gitlab404Error: 404 Not Found')
        done()
      })
  })
})
