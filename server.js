import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import db from './models/index.cjs';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';
import userRoutes from './routes/users.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Validate JWT Secret
const secret = process.env.JWT_SECRET;
if (!secret || secret.length < 32) {
  console.error('FATAL ERROR: JWT_SECRET must be at least 32 characters.');
  process.exit(1);
}

// Database Connection Startup Check
try {
  await db.sequelize.authenticate();
  console.log('Database connection has been established successfully.');
} catch (err) {
  console.error('Cannot reach the database:', err.message);
  process.exit(1);
}

// Middleware
const allowedOrigins = (process.env.CORS_ORIGIN || '').split(',').filter(Boolean);
app.use(cors({ origin: allowedOrigins.length ? allowedOrigins : '*' }));
app.use(morgan('dev'));
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

// Root route handler
app.get('/', (req, res) => {
  res.json({ message: 'IT Elective 2 Task Manager API is running successfully' });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});