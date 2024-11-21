import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';

const app = express();

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Puerto ${PORT} Activo `);
});

const io = new Server(server);
const messages = [];

io.on('connection', (socket) => {

  socket.on('message', (data) => {
    messages.push(data);
    io.emit('messageLogs', messages);
  });

  socket.on('authenticated', (data) => {
    socket.emit('messageLogs', messages);
    socket.broadcast.emit('newUserConnected', data);
  });
});

// Handshake
