import Promise from 'bluebird'
import extend from 'xtend'
import * as gitlabClient from './gitlabClient'

// MergeRequestとissueのユーザを表示します。
export default function(objectKind, body) {
  if (objectKind === 'merge_request' || objectKind === 'issue') {
    let originalAttributes = body.object_attributes,
      projectId = objectKind === 'merge_request' ? originalAttributes.target_project_id : originalAttributes.project_id,
      project = gitlabClient.project({
        id: projectId
      }),
      author = gitlabClient.user({
        user_id: originalAttributes.author_id
      }),
      assignee = originalAttributes.assignee_id ? gitlabClient.user({
        user_id: originalAttributes.assignee_id
      }) : Promise.resolve({
        name: ''
      })

    return Promise.all([project, author, assignee])
      .then((results) => {
        let object_attributes = {
          // URLを追加します。
          // URLに指定するIDはプロジェクト毎のiidです。
          url: `${results[0].web_url}/${objectKind}s/${originalAttributes.iid}`,

          // authorを追加します。
          author_name: results[1].name,

          // assigneeを追加します。
          assignee_name: results[2].name
        }

        // ディープコピー
        let newBody = extend(body)
        newBody.object_attributes = extend(object_attributes, body.object_attributes)

        return Promise.resolve(newBody)
      })
  } else {
    return Promise.resolve(body)
  }
}
