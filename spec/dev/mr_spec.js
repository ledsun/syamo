var frisby = require('frisby'),
    _ = require('underscore');

// プロジェクトIDとマージリクエストIDは環境依存です。
// ユーザがプロジェクトに参加していないが、プロジェクトのグループに参加している場合を再現するために
// https://developer.luxiar.jp/up-frontier/prism のIDを使います。
var mrData = {
    "object_kind": "merge_request",
    "object_attributes": {
        "id": 445,
        "target_branch": "master",
        "source_branch": "ms-viewport",
        "source_project_id": 14,
        "author_id": 2,
        "assignee_id": 2,
        "title": "MS-Viewport",
        "created_at": "2013-12-03T17:23:34Z",
        "updated_at": "2013-12-03T17:23:34Z",
        "st_commits": null,
        "st_diffs": null,
        "milestone_id": null,
        "state": "opened",
        "merge_status": "can_be_merged",
        "target_project_id": 62,
        "iid": 18,
        "description": " abc & 'hoge' "
    }
};

var uncheckedMrData = _.extend({}, mrData, {
    object_attributes: _.extend({}, mrData.object_attributes, {
        "merge_status": "unchecked"
    })
});

var mergedMrData = _.extend({}, mrData, {
    object_attributes: _.extend({}, mrData.object_attributes, {
        "state": "merged"
    })
});

var unknownMrData = _.extend({}, mrData, {
    object_attributes: _.extend({}, mrData.object_attributes, {
        "target_project_id": 14
    })
});

frisby.create('mr')
    .post('http://localhost:3000/gitlab/20003286', mrData, {
        json: true
    })
    .expectStatus(200)
    .expectBodyContains('OK')
    .toss();

frisby.create('merge_statusがuncheckedのmrは無視します。')
    .post('http://localhost:3000/gitlab/20003286', uncheckedMrData, {
        json: true
    })
    .expectStatus(200)
    .expectBodyContains('OK')
    .toss();

frisby.create('stateがmergedのmrは無視します。')
    .post('http://localhost:3000/gitlab/20003286', mergedMrData, {
        json: true
    })
    .expectStatus(200)
    .expectBodyContains('Ignore')
    .toss();

frisby.create('Gitlab APIから情報を取得できなかったら404を返します。')
    .post('http://localhost:3000/gitlab/20003286', unknownMrData, {
        json: true
    })
    .expectStatus(404)
    .expectBodyContains('Gitlab API NG')
    .toss();