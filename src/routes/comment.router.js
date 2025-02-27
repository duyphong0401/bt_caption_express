import express from 'express';
import { commentController } from '../controllers/comment.controller.js';

const commentRouter = express.Router();

// Tạo route CRUD
commentRouter.post('/comment-create', commentController.create);
commentRouter.get('/comment-list', commentController.findAll);
commentRouter.get('/comment/:id', commentController.findOne);
commentRouter.patch('comment/:id', commentController.update);
commentRouter.delete('comment/:id', commentController.remove);
commentRouter.get('/comment-image/:id', commentController.findByImageId);
commentRouter.get('/comment-image/check/:id', commentController.checkImageSaved);

export default commentRouter;

