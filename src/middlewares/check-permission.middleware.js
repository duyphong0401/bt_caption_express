import { BadRequestException } from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";

const checkPermission = async (req, res, next) => {
    try {
        const user = req.user;
        const role_id = user.role_id;
        const baseUrl = req.baseUrl;
        const routePath = req.route.path;
        const fullPath = baseUrl + routePath;
        const method = req.method;

        if (role_id === 1) return next(); 

        console.log({
            role_id,
            fullPath,
            method
        });

        const permission = await prisma.permissions.findFirst({
            where: {
                endpoint: fullPath,
                method: method
            }
        });

        if (!permission) {
            throw new BadRequestException(`API không có quyền tương ứng!`);
        }

        const role_Permission = await prisma.role_permissions.findFirst({
            where: {
                permission_id: permission.permission_id,
                role_id: role_id,
                is_active: true
            }
        });

        if (!role_Permission) {
            throw new BadRequestException(`Bạn không đủ quyền sử dụng API này`);
        }

        next();
    } catch (error) {
        next(error);
    }
};

export default checkPermission;
