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
  console.log('connected');
});

server.listen(port, () => {
  console.log('listening on port 3000...');
});