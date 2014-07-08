var frisby = require('frisby');

var pushData = {
        "before": "95790bf891e76fee5e1747ab589903a6a1f80f22",
        "after": "da1560886d4f094c3e6c9ef40349f7d38b5d27d7",
        "ref": "refs/heads/master",
        "user_id": 4,
        "user_name": "John Smith",
        "project_id": 15,
        "repository": {
            "name": "Diaspora",
            "url": "git@localhost:diaspora.git",
            "description": "",
            "homepage": "http://localhost/diaspora"
        },
        "commits": [{
            "id": "b6568db1bc1dcd7f8b4d5a946b0b91f9dacd7327",
            "message": "Update Catalan translation to e38cb41.",
            "timestamp": "2011-12-12T14:27:31+02:00",
            "url": "http://localhost/diaspora/commits/b6568db1bc1dcd7f8b4d5a946b0b91f9dacd7327",
            "author": {
                "name": "Jordi Mallach",
                "email": "jordi@softcatala.org"
            }
        }, {
            "id": "da1560886d4f094c3e6c9ef40349f7d38b5d27d7",
            "message": "fixed readme & 'hoge'",
            "timestamp": "2012-01-03T23:36:29+02:00",
            "url": "http://localhost/diaspora/commits/da1560886d4f094c3e6c9ef40349f7d38b5d27d7",
            "author": {
                "name": "GitLab dev user",
                "email": "gitlabdev@dv6700.(none)"
            }
        }],
        "total_commits_count": 4
    },
    push_branch = {
        "before": "0000000000000000000000000000000000000000",
        "after": "9b298340f13114aaf2b1990c95f4c6370ac8e44d",
        "ref": "refs/heads/add_issue_info",
        "user_id": 6,
        "user_name": "shigeru.nakajima",
        "project_id": 65,
        "repository": {
            "name": "chabot",
            "url": "git@developer.luxiar.jp:shigeru.nakajima/chabot.git",
            "description": "gitlabにpushされたらchatworkに書き込むアプリを作ります。\r\nhttp://c-note.chatwork.com/post/69274738468/chabot を参考にします。",
            "homepage": "https://developer.luxiar.jp/shigeru.nakajima/chabot"
        },
        "commits": [],
        "total_commits_count": 0
    };

frisby.create('push')
    .post('http://localhost:3000/gitlab/20105295', pushData, {
        json: true
    })
    .expectStatus(200)
    .expectBodyContains('OK')
    .toss();

frisby.create('テンプレートが用意してあるチャットルームを指定すると専用テンプレートを使います。')
    .post('http://localhost:3000/gitlab/20003286', pushData, {
        json: true
    })
    .expectStatus(200)
    .expectBodyContains('OK')
    .toss();

frisby.create('参加していないチャットルームを指定すると500を返します。')
    .post('http://localhost:3000/gitlab/1', pushData, {
        json: true
    })
    .expectStatus(500)
    .expectBodyContains("ChatWork NG : You don't have permission to send messages in this room")
    .toss();

frisby.create('total_commits_countが0のpushはbranchの追加・削除なので無視します')
    .post('http://localhost:3000/gitlab/20105295', push_branch, {
        json: true
    })
    .expectStatus(200)
    .expectBodyContains('Ignore')
    .toss();