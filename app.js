import connect from 'connect'
import bodyParser from 'body-parser'
import connectRoute from 'connect-route'
import gitlab from './lib/gitlab';

connect()
  .use(bodyParser.json())
  .use(connectRoute(router => {
    router.post('/gitlab/:chatId', gitlab);
  }))
  .listen(process.env.PORT || 3000);
