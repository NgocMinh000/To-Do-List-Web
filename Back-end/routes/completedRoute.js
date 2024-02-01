import express from 'express';
import { getCompleted } from '../controllers/completedController.js';

const completedRoutes = express.Router();

completedRoutes.get('/getCompleted', getCompleted); // Xác định route GET /completed để gọi hàm getCompleted

export default completedRoutes;
