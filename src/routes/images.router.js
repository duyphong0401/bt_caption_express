import express from 'express';
import { imageController } from '../controllers/images.controller.js';
import checkPermission from '../middlewares/check-permission.middleware.js';
import { protect } from '../middlewares/protect.middleware.js';

const imageRouter = express.Router();

// Tạo route CRUD
imageRouter.get("/image-list", protect, checkPermission, imageController.imageList);
imageRouter.get("/image-detail/:id", protect, imageController.imageDetail);


export default imageRouter;