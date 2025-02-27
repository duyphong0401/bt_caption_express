import { responseSuccess } from "../common/helpers/reposonse.help.js";
import { imageService } from "../services/images.service.js";

export const imageController = {
    imageList: async (req, res, next) => {
        try {
           const images = await imageService.imageList(req);
           const resData = responseSuccess(images, `Get List images Successfully`, 200);
           res.status(resData.code).json(resData);
        } catch (error) {
           next(error);
        }
     },
     imageDetail: async (req, res, next) => {
        try {
           const images = await imageService.imageDetail(req);
           const resData = responseSuccess(images, `Get Detail images Successfully`, 200);
           res.status(resData.code).json(resData);
        } catch (error) {
           next(error);
        }
     },
     
   create: async function (req, res, next) {
      try {
         const result = await imageService.create(req);
         const response = responseSuccess(result, `Create image successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   },

   findAll: async function (req, res, next) {
      try {
         const result = await imageService.findAll(req);
         const response = responseSuccess(result, `Get all images successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   },

   findOne: async function (req, res, next) {
      try {
         const result = await imageService.findOne(req);
         const response = responseSuccess(result, `Get image #${req.params.id} successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   },

   update: async function (req, res, next) {
      try {
         const result = await imageService.update(req);
         const response = responseSuccess(result, `Update image #${req.params.id} successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   },

   remove: async function (req, res, next) {
      try {
         const result = await imageService.remove(req);
         const response = responseSuccess(result, `Remove image #${req.params.id} successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   }
};