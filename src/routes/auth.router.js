import express from 'express';
import { authController } from '../controllers/auth.controller.js';

const authRouter = express.Router();
// Tạo route CRUD
authRouter.post( `/register` , authController.register)

authRouter.post( `/login` , authController.login)
authRouter.post(`/refresh-token`, authController.refreshToken);

// moduleRouter.get('/:id', moduleController.findOne);
// moduleRouter.patch('/:id', moduleController.update);
// moduleRouter.delete('/:id', moduleController.remove);

export default authRouter;