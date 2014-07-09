syamo
=====

Gitlabの更新情報(Push、Issue、MergeRequest)をChartworkに通知するサーバです。

## Usage

herokuに配置します。
事前に、herokuのアカウントを作成し、`heroku toolbelt`をインストールしてください。

秘密情報を環境変数を設定します。

- CHATWORK_TOKEN:[ChartworkのAPIトークン](http://developer.chatwork.com/ja/)
- GITLAB_URL:gitlab apiのurl(例:https://gitlab.com/api/v3)
- GITLAB_TOKEN:gitlab apiのトークン

```
git clone git@github.com:ledsun/syamo.git
cd syamo
heroku create myapp
heroku config:add CHATWORK_TOKEN=XXX
heroku config:add GITLAB_URL=YYY
heroku config:add GITLAB_TOKEN=ZZZ
git push heroku master
```

※ myappはherokuに作成するアプリケーション名です。好きな名前に変更してください。

配置に成功したか確認します。

```
cd tools
/bin/bash testHeroku.sh myapp 20003286
```

※ 第一引数にherokuのアプリケーション名を、第二引数チャットルームIDを指定してください。


gitlabのProjectのSettingsからwebhooksを登録します。

```
http://myapp.herokuapp.com/gitlab/チャットルームID
```

## Development

```
npm install
export CHATWORK_TOKEN=XXX
export GITLAB_URL=YYY
export GITLAB_TOKEN=ZZZ
grunt
```

※ 環境依存のためテストは失敗します。
