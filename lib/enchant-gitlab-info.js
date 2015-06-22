import Promise from 'bluebird'
import extend from 'xtend'
import * as gitlabClient from './gitlabClient'

// MergeRequestとissueのユーザを表示します。
export default function(objectKind, body) {
  if (objectKind === 'merge_request' || objectKind === 'issue') {
    let objectAttributes = body.object_attributes,
      projectId = objectKind === 'merge_request' ? objectAttributes.target_project_id : objectAttributes.project_id,
      project = gitlabClient.project({
        id: projectId
      }),
      author = gitlabClient.user({
        user_id: objectAttributes.author_id
      }),
      assignee = objectAttributes.assignee_id ? gitlabClient.user({
        user_id: objectAttributes.assignee_id
      }) : Promise.resolve({
        name: ''
      })

    return Promise.all([project, author, assignee])
      .then((results) => {
        // ディープコピー
        let newBody = extend(body, {
          objectAttributes: extend(objectAttributes)
        })

        // URLを追加します。
        // URLに指定するIDはプロジェクト毎のiidです。
        newBody.object_attributes.url = results[0].web_url + '/' + objectKind + 's/' + objectAttributes.iid

        // authorを追加します。
        newBody.object_attributes.author_name = results[1].name

        // assigneeを追加します。
        newBody.object_attributes.assignee_name = results[2].name

        return Promise.resolve(newBody)
      })
  } else {
    return Promise.resolve(body)
  }
}
