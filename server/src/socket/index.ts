import { Server as SocketServer } from 'socket.io';
import { Server as HttpServer } from 'http';
import { verifyToken } from '../utils/jwt';
import prisma from '../config/database';
import { env } from '../config/env';

export const initializeSocket = (httpServer: HttpServer) => {
  const io = new SocketServer(httpServer, {
    cors: {
      origin: env.CORS_ORIGIN,
      methods: ['GET', 'POST'],
    },
  });

  // Authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication required'));
      }

      const decoded = verifyToken(token);
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });

      if (!user) {
        return next(new Error('User not found'));
      }

      socket.data.user = user;
      next();
    } catch {
      next(new Error('Authentication failed'));
    }
  });

  io.on('connection', (socket) => {
    const user = socket.data.user;
    console.log(`[Socket] User connected: ${user.name} (${user.role})`);

    // Join personal notification room
    socket.join(`user:${user.id}`);

    // Chat room handlers
    socket.on('join_room', ({ groupId }) => {
      socket.join(`chat:${groupId}`);
      console.log(`[Socket] ${user.name} joined chat:${groupId}`);
    });

    socket.on('leave_room', ({ groupId }) => {
      socket.leave(`chat:${groupId}`);
      console.log(`[Socket] ${user.name} left chat:${groupId}`);
    });

    socket.on('disconnect', () => {
      console.log(`[Socket] User disconnected: ${user.name}`);
    });
  });

  return io;
};
