import Promise from 'bluebird'
import extend from 'xtend'
import * as gitlabClient from './gitlabClient'

// MRのユーザを表示します。
module.exports = function(objectKind, body) {
  if (objectKind === 'merge_request' || objectKind === 'issue') {
    var object_attributes = body.object_attributes;
    var projectId = objectKind === 'merge_request' ? object_attributes.target_project_id : object_attributes.project_id;
    var project = gitlabClient.project({
        id: projectId
      }),
      author = gitlabClient.user({
        user_id: object_attributes.author_id
      }),
      assignee = object_attributes.assignee_id ? gitlabClient.user({
        user_id: object_attributes.assignee_id
      }) : Promise.resolve({
        name: ''
      });

    return Promise.all([project, author, assignee])
      .then(function(results) {
        // ディープコピー
        var newBody = extend({}, body, {
          object_attributes: extend({}, object_attributes)
        });

        // URLを追加します。
        // URLに指定するIDはプロジェクト毎のiidです。
        newBody.object_attributes.url = results[0].web_url + '/' + objectKind + 's/' + object_attributes.iid;

        // authorを追加します。
        newBody.object_attributes.author_name = results[1].name;

        // assigneeを追加します。
        newBody.object_attributes.assignee_name = results[2].name;

        return Promise.resolve(newBody);
      });
  } else {
    return Promise.resolve(body);
  }
};
