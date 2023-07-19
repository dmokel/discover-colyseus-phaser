import { monitor } from '@colyseus/monitor';
import { playground } from '@colyseus/playground';
import config from '@colyseus/tools';
import { MyRoom } from './rooms/my-room';

const cfg = config({
  options: {
    devMode: true,
  },

  initializeGameServer: (gameServer) => {
    gameServer.define('my_room', MyRoom);
    gameServer.simulateLatency(200);
  },

  initializeExpress: (app) => {
    app.get('/hello_world', (req, res) => {
      res.send("It's time to kick ass and chew bubblegum!");
    });

    if (process.env.NODE_ENV !== 'production') {
      app.use('/', playground);
    }

    app.use('/colyseus', monitor());
  },
});

export { cfg };
