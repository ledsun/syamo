syamo
=====

Gitlabの更新情報をChartworkに通知するサーバ

## Usage

herokuに配置します。

秘密情報を環境変数を設定します。

- CHATWORK_TOKEN:ChartworkのAPIトークン(ビジネスプランの場合は申請が必要です)
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


gitlabのwebhooksを登録します。

## Development

```
npm install
export CHATWORK_TOKEN=XXX
export GITLAB_URL=YYY
export GITLAB_TOKEN=ZZZ
grunt
```
