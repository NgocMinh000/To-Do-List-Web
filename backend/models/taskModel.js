import mongoose from 'mongoose';
import User from './userModel.js';

const taskSchema = new mongoose.Schema({
  task_id: mongoose.Schema.Types.ObjectId,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Tham chiếu đến model User
  },
  title: String,
  description: String,
  isImportant: Boolean,
  dueDate: {
    type: Date,
    get: (value) => value.toISOString().slice(0, 10), // Chuyển đổi thành chuỗi ngày tháng năm
    set: (value) => new Date(value) // Chuyển đổi chuỗi ngày tháng năm thành đối tượng Date
  },
  isCompleted: Boolean,
  comment: [],
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default Task;
