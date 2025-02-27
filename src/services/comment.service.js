import { BadRequestException } from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";

export const commentService = {
    create: async function (req) {
        const { user_id, content, image_id } = req.body;

        if (!user_id || !content) {
            throw new BadRequestException("user_id và content là bắt buộc");
        }

        // Kiểm tra user có tồn tại không
        const userExists = await prisma.users.findUnique({
            where: { user_id }
        });

        if (!userExists) {
            throw new BadRequestException("Người dùng không tồn tại");
        }

        // Kiểm tra ảnh có tồn tại không (nếu có image_id)
        if (image_id) {
            const imageExists = await prisma.images.findUnique({
                where: { id: image_id }
            });

            if (!imageExists) {
                throw new BadRequestException(`Ảnh với ID ${image_id} không tồn tại`);
            }
        }

        return await prisma.comments.create({
            data: {
                content,
                created_at: new Date(),
                users: { connect: { user_id } },  // Kết nối với bảng users
                ...(image_id ? { images: { connect: { id: image_id } } } : {}) // Kết nối bảng images nếu có
            },
        });
    },

    findByImageId: async function (image_id) {
        if (!image_id || isNaN(image_id)) {
            throw new BadRequestException("Vui lòng cung cấp image_id hợp lệ");
        }

        return await prisma.comments.findMany({
            where: { image_id: parseInt(image_id) },
            include: {
                users: true, 
                images: true, 
            },
        });
    },
    checkImageSaved: async function (req) {
        const { image_id } = req.params;
    
        if (!image_id) {
            throw new BadRequestException("Vui lòng cung cấp image_id");
        }
    
        const comment = await prisma.comments.findFirst({
            where: { image_id: parseInt(image_id) },
        });
    
        return { isSaved: !!comment }; 
    },
    

    findAll: async function () {
        return await prisma.comments.findMany({
            include: { users: true },
        });
    },

    findOne: async function (req) {
        const { id } = req.params;
        return await prisma.comments.findUnique({
            where: { comment_id: parseInt(id) },
            include: { users: true },
        });
    },

    update: async function (req) {
        const { id } = req.params;
        const { content } = req.body;
        return await prisma.comments.update({
            where: { comment_id: parseInt(id) },
            data: { content },
        });
    },

    remove: async function (req) {
        const { id } = req.params;
        return await prisma.comments.delete({
            where: { comment_id: parseInt(id) },
        });
    },
};
