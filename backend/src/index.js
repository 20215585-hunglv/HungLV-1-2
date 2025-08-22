import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRoutes from './routes/user.route.js';
import { errorHandler } from './middlewares/errorHandler.js';
import authRoutes from './routes/auth.route.js';
import exportRoutes from './routes/export.route.js';

const app = express();
const PORT = process.env.PORT || 3800;

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/export', exportRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});
