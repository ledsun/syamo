import Promise from 'bluebird'
import extend from 'xtend'
import * as gitlabClient from './gitlabClient'

// MRのユーザを表示します。
module.exports = function(objectKind, body) {
  if (objectKind === 'merge_request' || objectKind === 'issue') {
    var objectAttributes = body.object_attributes;
    var projectId = objectKind === 'merge_request' ? objectAttributes.target_project_id : objectAttributes.project_id;
    var project = gitlabClient.project({
        id: projectId
      }),
      author = gitlabClient.user({
        user_id: objectAttributes.author_id
      }),
      assignee = objectAttributes.assignee_id ? gitlabClient.user({
        user_id: objectAttributes.assignee_id
      }) : Promise.resolve({
        name: ''
      });

    return Promise.all([project, author, assignee])
      .then(function(results) {
        // ディープコピー
        var newBody = extend({}, body, {
          objectAttributes: extend({}, objectAttributes)
        });

        // URLを追加します。
        // URLに指定するIDはプロジェクト毎のiidです。
        newBody.objectAttributes.url = results[0].web_url + '/' + objectKind + 's/' + objectAttributes.iid;

        // authorを追加します。
        newBody.objectAttributes.author_name = results[1].name;

        // assigneeを追加します。
        newBody.objectAttributes.assignee_name = results[2].name;

        return Promise.resolve(newBody);
      });
  } else {
    return Promise.resolve(body);
  }
};
