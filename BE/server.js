import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './config/database.js';
import apiRoutes from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:3001').split(',');
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Sync database and start server
sequelize.sync().then(() => {
  console.log('✅ Database synced');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('⚠️  Database sync failed:', err.message);
  console.log('\n📋 Setup MySQL:');
  console.log('   1. Make sure MySQL is running');
  console.log('   2. Create database: CREATE DATABASE manta_core;');
  console.log('   3. Check .env credentials (DB_USER, DB_PASSWORD)');
  console.log('   4. Restart server\n');

  // Still start server even if DB sync fails (for development)
  app.listen(PORT, () => {
    console.log(`⚠️  Server running on http://localhost:${PORT} (without database)`);
  });
});
