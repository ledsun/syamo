syamo
=====

Gitlabの更新情報(Push、Issue、MergeRequest)をChartworkに通知するサーバです。

## Deploy
### herokuに配置
[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

秘密情報を環境変数を設定します。

- CHATWORK_TOKEN:[ChartworkのAPIトークン](http://developer.chatwork.com/ja/)
- GITLAB_URL:gitlab apiのurl(例:https://gitlab.com/api/v3)
- GITLAB_TOKEN:gitlab apiのトークン

環境変数を設定します。

- NODE_ENV:production 本番環境ではassertを削除します。


### 配置確認
配置に成功したか確認します。

```
node tools/testHeroku.js myapp 20003286
```

※ 第一引数にherokuのアプリケーション名を、第二引数チャットルームIDを指定してください。


## Gitlabのwebhook設定
GitlabのProjectのSettingsからwebhooksを登録します。

1. gitlabのプロジェクトを開きます
1. `Setting`を開きます
1. `Web Hooks`を開きます
1. `URL`に http://myapp.herokuapp.com/gitlab/チャットルームID （数字のみ） を入れます
1. `Push events`のチェックを入れます
1. `Add Web Hook`ボタンを押します

## Customize

- テンプレートを変更することで通知内容を変更することが出来ます。
- テンプレートは`template`ディレクトリに入っています。
- テンプレートはmustacheテンプレートです。
- テンプレート名は更新種別[.チャットルームID].mustacheです。
  - 更新種別はissue、merge_request、pushの3種類です。
  - チャットルームIDを指定することで、特定のチャットルームにだけ適用することができます。
- rawプロパティを参照すると全ての情報をJSON形式で表示します。

## Development

bash

```
npm install
export CHATWORK_TOKEN=XXX
export GITLAB_URL=YYY
export GITLAB_TOKEN=ZZZ
npm run watch
```

fish

```
npm install
env CHATWORK_TOKEN=XXX GITLAB_URL=YYY GITLAB_TOKEN=ZZZ npm run watch
```

## Test

```
npm test
```

※ 環境依存のためテストは失敗します。

## Why Syamo?
参考にしたアプリケーションの名前をもじってつけました。

https://github.com/astronaughts/chabot

Thank you!
