import { LobbyRoom, Server } from '@colyseus/core';
import { monitor } from '@colyseus/monitor';
import { playground } from '@colyseus/playground';
import config from '@colyseus/tools';
import { RoomType } from '@voidoor/api-types';
import { MyRoom } from './rooms/my-room';
import { WeddingSpace } from './rooms/wedding-space';

let gameServerRef: Server;
let latencySimulationMs = 0;

const cfg = config({
  options: {
    devMode: false,
  },

  initializeGameServer: (gameServer) => {
    gameServer.define('my_room', MyRoom);
    // 每当带有"realtime listing"的房间有更新时，内置的 LobbyRoom 将自动通知其连接的客户端
    // enableRealtimeListing
    gameServer.define(RoomType.Lobby, LobbyRoom);
    gameServer.define(RoomType.Custom, WeddingSpace).enableRealtimeListing();

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
