import express from 'express';
import { getImportant } from '../controllers/importantController.js';

const importantRoutes = express.Router();

importantRoutes.get('/getImportant', getImportant); // Xác định route GET /important để gọi hàm getImportant

export default importantRoutes;
