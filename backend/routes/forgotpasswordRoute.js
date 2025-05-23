import express from 'express';
import { forgotPassword } from '../controllers/forgotpasswordController.js';
import { resetPassword } from '../controllers/resetpasswordController.js';
import jwt from 'jsonwebtoken'; 
import User from '../models/userModel.js';
import path from 'path';
import { fileURLToPath } from 'url'; 
import fs from 'fs'; // Để đọc file HTML

// 

const router = express.Router();

// Định nghĩa route cho yêu cầu quên mật khẩu
router.post('/forgot-password', (req, res) => {
  console.log('Request body:', req.body); // Log kiểm tra dữ liệu nhận được
  forgotPassword(req, res);
});

// Route đặt lại mật khẩu
router.post('/reset-password', (req, res) => {
  console.log('Request body:', req.body); // Log kiểm tra dữ liệu nhận được
  resetPassword(req, res);
});

// Route xác minh token và chuyển hướng đến Firebase URL
router.get('/verify-reset-password/:token', async (req, res) => {
  const { token } = req.params;
  console.log('Received token:', token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Token hợp lệ, chuyển hướng đến URL của Firebase
    const firebaseUrl = `https://baocaonhom33.web.app/views/reset.html?token=${token}`;
    res.redirect(firebaseUrl); // Chuyển hướng người dùng đến Firebase
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(400).send('Invalid or expired token.');
  }
});

export default router;
