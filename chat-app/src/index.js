import express from 'express';
import http from 'node:http';
import path from 'node:path';
import { Server } from 'socket.io';

const __dirname = import.meta.dirname;
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
// create socketio instance
const io = new Server(server);

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
  // this emits an event directly to the client which just connected
  socket.emit('message', `Welcome! ${socket.id}`);
  // this emits the event to all connected clients except the one just connected
  socket.broadcast.emit('message', 'A new user has joined!');
  socket.on('sendMessage', (message) => {
    	// this emits the event to all connected clients
	io.emit('message', message);
  });
});

server.listen(port, () => {
  console.log('listening on port 3000...');
});
