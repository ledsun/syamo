import gitlab from 'node-gitlab'

let client = gitlab.createPromise({
  api: process.env.GITLAB_URL,
  privateToken: process.env.GITLAB_TOKEN
})

export let project = client.projects.get
export let user = client.users.get
