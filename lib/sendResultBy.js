import _ from 'underscore'

// 結果作成関数群
let make = {
  gitlabNg: function(err) {
    return {
      error: err,
      statusCode: 404,
      message: 'Gitlab API NG : ' + err
    };
  },
  chatWorkNg: function(err) {
    return {
      error: err,
      message: 'ChatWork NG : ' + err
    };
  },
  applicationNg: function(err) {
    return {
      error: err,
      message: 'Application NG : ' + err
    };
  }
};

export default function(res) {
  return {
    make: make,
    send: (result) => send(res, result),
    sendError: _.compose(send, make.applicationNg)
  }
};

function send(res, result) {
  console.error(result.error)
  res.statusCode = result.statusCode || 500
  res.end(result.message)
}
