var frisby = require('frisby');
var extend = require('xtend');

var issueData = {
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
    updated_at: '2015-07-21 10:36:16 UTC',
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

frisby.create('issue')
  .post('http://localhost:3000/gitlab/20105295', issueData, {
    json: true
  })
  .expectStatus(200)
  .expectBodyContains('OK')
  .toss();

frisby.create('直前と全く同じissueは無視します。')
  .post('http://localhost:3000/gitlab/20105295', issueData, {
    json: true
  })
  .expectStatus(200)
  .expectBodyContains('Ignore')
  .toss();

frisby.create('異なるチャットに送る場合は別のissueとして扱います。')
  .post('http://localhost:3000/gitlab/20003286', issueData, {
    json: true
  })
  .expectStatus(200)
  .expectBodyContains('OK')
  .toss();

frisby.create('actionがupdateなissueは無視します。')
  .post('http://localhost:3000/gitlab/123456', extend({}, issueData, {
    object_attributes: {
      action: 'update'
    }
  }), {
    json: true
  })
  .expectStatus(200)
  .expectBodyContains('Ignore')
  .toss();
