# 実行時に指定された引数の数、つまり変数 $# の値が 3 でなければエラー終了。
if [ $# -ne 2 ]; then
  echo "第一引数にアプリケーション名を、第二引数にチャットルームIDを指定してください。" 1>&2
  exit 1
fi

curl -X POST -H "Content-Type: application/json" http://$1.herokuapp.com/gitlab/$2 -d @message.json
