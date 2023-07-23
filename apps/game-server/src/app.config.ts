import { Server } from '@colyseus/core';
import { monitor } from '@colyseus/monitor';
import { playground } from '@colyseus/playground';
import config from '@colyseus/tools';
import { MyRoom } from './rooms/my-room';

let gameServerRef: Server;
let latencySimulationMs = 0;

const cfg = config({
  options: {
    devMode: true,
  },

  initializeGameServer: (gameServer) => {
    gameServer.define('my_room', MyRoom);

    gameServerRef = gameServer;
  },

  initializeExpress: (app) => {
    app.get('/hello_world', (req, res) => {
      res.send("It's time to kick ass and chew bubblegum!");
    });

    app.get('/latency', (req, res) => {
      res.json(latencySimulationMs);
    });
    app.get('/simulate-latency/:milliseconds', (req, res) => {
      latencySimulationMs = parseInt(req.params.milliseconds || '100');

      gameServerRef.simulateLatency(latencySimulationMs);

      res.json({ success: true });
    });

    if (process.env.NODE_ENV !== 'production') {
      app.use('/', playground);
    }

    app.use('/colyseus', monitor());
  },
});

export { cfg };
