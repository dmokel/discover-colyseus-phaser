enum RoomType {
  Lobby = 'lobby',
  Public = 'public',
  Custom = 'custom',
}

interface IRoomData {
  name: string;
  description: string;
  password: string | null;
  autoDispose: boolean;
}

enum Message {
  UPDATE_PLAYER,
  UPDATE_PLAYER_NAME,
  READY_TO_CONNECT,
  DISCONNECT_STREAM,
  CONNECT_TO_COMPUTER,
  DISCONNECT_FROM_COMPUTER,
  STOP_SCREEN_SHARE,
  CONNECT_TO_WHITEBOARD,
  DISCONNECT_FROM_WHITEBOARD,
  VIDEO_CONNECTED,
  ADD_CHAT_MESSAGE,
  SEND_ROOM_DATA,
}

export { IRoomData, Message, RoomType };
