import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://tj26595:GUjT4JI5jXwtrZkr@cluster0.qgmb6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.error(err));

const app = express();

// ✅ Allow frontend origin for production and dev
const allowedOrigins = [
  'https://studentabode.netlify.app', // ✅ your deployed frontend
  'http://localhost:5173',            // ✅ Vite dev server
  'http://localhost:3000'             // ✅ Create React App dev server
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  maxAge: 3600
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start the server (Render uses a dynamic port)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
