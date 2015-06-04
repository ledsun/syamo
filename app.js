import connect from 'connect'
import connectRoute from 'connect-route'
import gitlab from './lib/gitlab';

connect()
  .use(connect.json())
  .use(connectRoute(router => {
    router.post('/gitlab/:chatId', gitlab);
  }))
  .listen(process.env.PORT || 3000);
