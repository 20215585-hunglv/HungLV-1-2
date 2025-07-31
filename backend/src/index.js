import express from 'express';
import connectDB from './configs/db.js';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3800;

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});
