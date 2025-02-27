import { BadRequestException } from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";

export const imageService = {
    imageList: async (req) => {
        try {
            const { page, search } = req.query;

            console.log(`Page: ${page}, Search: ${search}`);

            const pageSize = 10;
            const pageNumber = Math.max(1, parseInt(page, 10) || 1);

            const whereCondition = search
                ? { image_name: { contains: search } } 
                : {};

            const total = await prisma.images.count({ where: whereCondition });
            const skip = (pageNumber - 1) * pageSize;

            const images = await prisma.images.findMany({
                where: whereCondition,
                skip: Math.min(skip, total),
                take: pageSize,
            });

            return { total, images };
        } catch (error) {
            console.error("Lỗi trong imageList:", error.message);
            throw error;
        }
    },
    

    imageDetail: async (req) => {
        const { id } = req.params;
        if (!id) throw new BadRequestException(`Vui lòng cung cấp ID của ảnh`);

        const image = await prisma.images.findUnique({
            where: { id: +id },
        });

        if (!image) throw new BadRequestException(`Không tìm thấy ảnh với ID: ${id}`);

        return image;
    },

    create: async function (req) {
        return `This action create`;
    },

    findAll: async function (req) {
        return `This action returns all image`;
    },

    findOne: async function (req) {
        return `This action returns a id: ${req.params.id} image`;
    },

    update: async function (req) {
        return `This action updates a id: ${req.params.id} image`;
    },

    remove: async function (req) {
        return `This action removes a id: ${req.params.id} image`;
    },
};
