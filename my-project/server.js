const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

// Initialize the Next.js application
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('join-room', (roomId, user) => {
      socket.join(roomId);
      // Store user data on the socket instance if needed
      socket.data.user = user;
      socket.data.roomId = roomId;
      
      // Get all clients in this room to extract active users
      const getActiveUsers = async () => {
        const sockets = await io.in(roomId).fetchSockets();
        const activeUsers = sockets.map(s => s.data.user).filter(Boolean);
        // Ensure uniqueness by ID
        const uniqueUsers = Array.from(new Map(activeUsers.map(u => [u._id, u])).values());
        io.to(roomId).emit('active-users', uniqueUsers);
      };

      getActiveUsers();
    });

    socket.on('disconnect', async () => {
      console.log('A user disconnected:', socket.id);
      if (socket.data.roomId) {
        const roomId = socket.data.roomId;
        // Broadcast updated active users list
        const sockets = await io.in(roomId).fetchSockets();
        const activeUsers = sockets.map(s => s.data.user).filter(Boolean);
        const uniqueUsers = Array.from(new Map(activeUsers.map(u => [u._id, u])).values());
        io.to(roomId).emit('active-users', uniqueUsers);
      }
    });

    socket.on('send-message', (roomId, messageData) => {
      io.to(roomId).emit('receive-message', messageData);
    });

    socket.on('task-added', (roomId, taskData) => {
      io.to(roomId).emit('receive-task-added', taskData);
    });

    socket.on('task-updated', (roomId, taskData) => {
      io.to(roomId).emit('receive-task-updated', taskData);
    });
  });

  httpServer
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
