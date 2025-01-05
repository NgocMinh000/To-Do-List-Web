import functions from 'firebase-functions';
import admin from 'firebase-admin';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Các models
import User from './models/userModel';
import Task from './models/taskModel';
import Comment from './models/CommentModel';
import UploadFile from './models/uploadFile';

// Các routes
import taskRoutes from './routes/taskRoute';
import homeRoutes from './routes/homeRoute';
import importantRoutes from './routes/importantRoute';
import completedRoutes from './routes/completedRoute';
import loginRoutes from './routes/loginRoute';
import signupRoutes from './routes/signupRoute';
import todayRoutes from './routes/todayRoute';
import searchRoutes from './routes/searchRoute';
import commentRoutes from './routes/commentRoute';
import uploadFileRoutes from './routes/uploadFileRoute';
import forgotPasswordRoutes from './routes/forgotpasswordRoute';

// Firebase Admin SDK
admin.initializeApp();

// Load biến môi trường từ file .env
dotenv.config();

// Middleware để parse body của request
const corsMiddleware = cors({ origin: true });

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Firebase Function cho các routes
export const api = functions.https.onRequest((req, res) => {
  corsMiddleware(req, res, () => {
    switch (req.method) {
      case 'GET':
        res.send("GET request to the root URL of Firebase Function");
        break;
      default:
        res.status(405).send('Method Not Allowed');
        break;
    }
  });
});

// Đăng ký các routes tương tự như Express
export const tasksRoute = functions.https.onRequest(taskRoutes);
export const homeRoute = functions.https.onRequest(homeRoutes);
export const importantRoute = functions.https.onRequest(importantRoutes);
export const completedRoute = functions.https.onRequest(completedRoutes);
export const loginRoute = functions.https.onRequest(loginRoutes);
export const signupRoute = functions.https.onRequest(signupRoutes);
export const todayRoute = functions.https.onRequest(todayRoutes);
export const searchRoute = functions.https.onRequest(searchRoutes);
export const commentRoute = functions.https.onRequest(commentRoutes);
export const uploadFileRoute = functions.https.onRequest(uploadFileRoutes);
export const forgotPasswordRoute = functions.https.onRequest(forgotPasswordRoutes);

// Route mặc định trả về toàn bộ dữ liệu
export const getAllData = functions.https.onRequest(async (req, res) => {
  try {
    const tasks = await Task.find().populate('user_id', 'name email');
    const users = await User.find();
    const comments = await Comment.find();
    const files = await UploadFile.find();

    res.json({
      tasks: tasks,
      users: users,
      comments: comments,
      files: files
    });
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Failed to fetch data', details: err.message });
  }
});
