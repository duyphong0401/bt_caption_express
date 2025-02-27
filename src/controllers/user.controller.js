import { responseSuccess } from "../common/helpers/reposonse.help.js";
import prisma from "../common/prisma/init.prisma.js";
import { userService } from "../services/user.service.js";

export const userController = {
   
   create: async function (req, res, next) {
      try {
         const result = await userService.create(req);
         const response = responseSuccess(result, `Create user successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   },
   getUserCreatedImages: async (req, res) => {
      try {
          const { id } = req.params;  
  
          const images = await prisma.images.findMany({
              where: { user_id: parseInt(id) }, 
              select: {
                  id: true,
                  image_name: true,
                  url: true,
                  created_at: true,
              },
          });
  
          return res.status(200).json({
              status: "success",
              code: 200,
              message: `Get user #${id}-created-images successfully`,
              metaData: images,
              doc: "api.domain.com/doc",
          });
      } catch (error) {
          console.error("Error fetching user images:", error);
          return res.status(500).json({
              status: "error",
              code: 500,
              message: "Internal server error",
              doc: "api.domain.com/doc",
          });
      }
  },
   getUserImages: async (req, res) => {
      const { id } = req.params; 
      try {
         const images = await userService.getUserImages(id);

         return res.status(200).json({
            status: "success",
            code: 200,
            message: `Get user #${id}-images successfully`,
            metaData: images, 
            doc: "api.domain.com/doc"
         });
      } catch (error) {
         return res.status(500).json({
            status: "error",
            code: 500,
            message: "Internal Server Error",
            doc: "api.domain.com/doc"
         });
      }
   },
   findAll: async function (req, res, next) {
      try {
          const users = await userService.findAll();
          console.log("Danh sách user từ DB:", users);
          return res.status(200).json({
              status: "success",
              code: 200,
              message: "Lấy danh sách user thành công",
              data: users 
          });

      } catch (err) {
          next(err);
      }
  },

   findOne: async function (req, res, next) {
      try {
         const result = await userService.findOne(req);
         const response = responseSuccess(result, `Get user #${req.params.id} successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   },

   update: async function (req, res, next) {
      try {
         const result = await userService.update(req);
         const response = responseSuccess(result, `Update user #${req.params.id} successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   },

   remove: async function (req, res, next) {
      try {
         const result = await userService.remove(req);
         const response = responseSuccess({}, result);
         res.status(200).json(response);
      } catch (err) {
         next(err);
      }
   }
};