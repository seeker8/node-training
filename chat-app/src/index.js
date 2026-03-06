import express from 'express';
import http from 'node:http';
import path from 'node:path';
import { Server } from 'socket.io';
import { Filter } from 'bad-words';
import { generateMessage, generateLocationMessage } from './utils/messages.js';
import { addUser, getUser, removeUser } from './utils/user.js';

const __dirname = import.meta.dirname;
const port = process.env.PORT || 3000;

const EVENT_TYPES = Object.freeze({
  MESSAGE: 'message',
  SEND_MESSAGE: 'sendMessage',
  SEND_LOCATION: 'sendLocation',
  LOCATION_MESSAGE: 'locationMessage',
  JOIN: 'join'
});

const app = express();
const server = http.createServer(app);
// create socketio instance
const io = new Server(server);

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
  // this emits an event directly to the client which just connected
  // socket.emit(EVENT_TYPES.MESSAGE, generateMessage('Welcome!'));

  // this emits the event to all connected clients except the one just connected
  // socket.broadcast.emit(EVENT_TYPES.MESSAGE, generateMessage('A new user has joined!'));

  // this is to start a room
  socket.on(EVENT_TYPES.JOIN, ({ username, room }, callback) => {
    const { error, user } = addUser({
      id: socket.id,
      username,
      room
    });
    if (error) {
      callback(error);
    }
    socket.join(room);
    socket.emit(EVENT_TYPES.MESSAGE, generateMessage(`Welcome ${user.userName}`));
    socket.broadcast.to(user.joinedRoom).emit(EVENT_TYPES.MESSAGE, generateMessage(`${user.userName} has joined!`));
  });

  socket.on(EVENT_TYPES.SEND_MESSAGE, (message, callback) => {
    const user = getUser(socket.id);
    const filter = new Filter();
    if (filter.isProfane(message)) {
      return callback('Profanity is not allowed');
    }
    // this emits the event to all connected clients
    io.to(user.joinedRoom).emit(EVENT_TYPES.MESSAGE, generateMessage(message, user));
    callback();
  });

  socket.on(EVENT_TYPES.SEND_LOCATION, (locationObj, callback) => {
    const user = getUser(socket.id);
    const { longitude, latitude } = locationObj;
    io.emit(
      EVENT_TYPES.LOCATION_MESSAGE,
      generateLocationMessage(`https://www.google.com/maps/@${longitude},${latitude}`, user)
    );
    callback();
  });

  // appUsersthis event is emitted when a client disconnects and needs to be setup from inside the 
  // connection listener
  socket.on('disconnect', () => {
    const removedUser = removeUser(socket.id);
    if (removedUser) {
      io.to(removedUser.joinedRoom).emit(EVENT_TYPES.MESSAGE, generateMessage(`${removedUser.userName} has left`));
    }
  });
});

server.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
