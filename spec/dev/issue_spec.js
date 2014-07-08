var frisby = require('frisby');

var issueData = {
    "object_kind": "issue",
    "object_attributes": {
        "id": 382,
        "title": "test2",
        "assignee_id": 6,
        "author_id": 6,
        "project_id": 65,
        "created_at": "2014-05-26T00:30:43.350Z",
        "updated_at": "2014-05-26T00:30:43.350Z",
        "position": 0,
        "branch_name": null,
        "description": "aaa",
        "milestone_id": null,
        "state": "opened",
        "iid": 2
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