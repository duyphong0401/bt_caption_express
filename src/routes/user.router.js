import express from 'express';
import { userController } from '../controllers/user.controller.js';

const userRouter = express.Router();

// Tạo route CRUD
userRouter.post('/', userController.create);
userRouter.get('/users', userController.findAll);
userRouter.get('/:id', userController.findOne);
userRouter.patch('/:id', userController.update);
userRouter.delete('/user-images-delete/:id', userController.remove);
userRouter.get("/user-images/:id", userController.getUserImages);
userRouter.get("/user-created-images/:id", userController.getUserCreatedImages);



export default userRouter;