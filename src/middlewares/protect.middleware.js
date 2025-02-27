import jwt from "jsonwebtoken";
import { UnauthorizedException } from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";
import { ACCESS_TOKEN_SECRET } from "../common/constant/app.constant.js";

export const protect = async (req, res, next) => {
   try {
      const accessToken = req.headers.authorization?.split(" ")[1];

      if (!accessToken) {
         throw new UnauthorizedException(`Vui lòng cung cấp token để tiếp tục sử dụng`);
      }

      const decode = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);



      const user = await prisma.users.findUnique({
         where: {
            user_id: decode.userId,
         },
         include: {
            roles: true,
         },
      })

      req.user = user;

      next();
   } catch (error) {
      next(error);
   }
};
