import prisma from "../common/prisma/init.prisma.js";

export const userService = {

   create: async function (req) {
      return `This action create`;
   },
   getUserImages: async function (user_id) {
      try {
         const images = await prisma.images.findMany({
            where: { user_id: parseInt(user_id) },  
            select: {
               id: true,
               image_name: true,
               url: true,
               created_at: true
            }
         });

         console.log("User images:", images); 
         return images;
      } catch (error) {
         console.error("Error fetching user images:", error);
         throw error;
      }
   },
   findAll: async function () {
      return await prisma.users.findMany({
          select: {
              user_id: true,
              full_name: true, 
              email: true,
              _count: {
                  select: {
                      comments: true
                  }
              },
              images: {   
                  select: {
                      id: true,
                      image_name: true,
                      url: true
                  }
              }
          }
      });
  },
  
   findOne: async function (req) {
      return `This action returns a id: ${req.params.id} user`;
   },

   update: async function (req) {
      return `This action updates a id: ${req.params.id} user`;
   },

   remove: async function (req) {
      try {
         const imageId = Number(req.params.id);
   
         if (isNaN(imageId)) {
            return { status: "error", code: 400, message: "Invalid image ID" };
         }
   
         const existingImage = await prisma.images.findUnique({
            where: { id: imageId }
         });
   
         if (!existingImage) {
            return { status: "error", code: 404, message: "Image not found" };
         }
   
         await prisma.images.delete({
            where: { id: imageId }
         });
   
         return { status: "success", code: 200, message: `Removed image #${imageId} successfully` };
   
      } catch (error) {
         console.error("Error removing image:", error);
         return { status: "error", code: 500, message: "Internal server error" };
      }
   }
   
};