import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  task_id: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
  isImportant: Boolean,
  dueDate: Date,
  isCompleted: Boolean,
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default Task;
