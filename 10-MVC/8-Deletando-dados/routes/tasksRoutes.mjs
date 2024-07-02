import express from 'express';
import TaskController from '../controllers/TaskController.mjs';

const router = express.Router();

router.get('/add', TaskController.createTask);
router.post('/add', TaskController.createTaskSave);
router.post('/remove', TaskController.removeTask);
router.get('/', TaskController.showTasks);

export default router;
