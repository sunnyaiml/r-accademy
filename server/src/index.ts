import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import path from 'path';
import { env } from './config/env';
import routes from './routes';
import { errorHandler, notFound } from './middleware/errorHandler';
import { initializeSocket } from './socket';

const app = express();
const httpServer = createServer(app);

// Initialize Socket.io
const io = initializeSocket(httpServer);
app.set('io', io);

// Middleware
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '..', env.UPLOAD_DIR)));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api', routes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
httpServer.listen(env.PORT, () => {
  console.log(`[Server] R-Education backend running on http://localhost:${env.PORT}`);
  console.log(`[Server] API base: http://localhost:${env.PORT}/api`);
});

export default app;
