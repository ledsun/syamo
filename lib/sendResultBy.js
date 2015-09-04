// 結果作成関数群
let make = {
  gitlabNg: function(err) {
    return {
      error: err,
      statusCode: 404,
      message: 'Gitlab API NG : ' + err
    };
  }
};

export default function(res) {
  return {
    make: make,
    send: (result) => send(res, result)
  }
};

function send(res, result) {
  console.error(result.error)
  res.statusCode = result.statusCode || 500
  res.end(result.message)
}
