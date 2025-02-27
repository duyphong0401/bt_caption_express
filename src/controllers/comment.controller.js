import { responseSuccess } from "../common/helpers/reposonse.help.js";
import { commentService } from "../services/comment.service.js";

export const commentController = {
    create: async function (req, res, next) {
        try {
            console.log("Request body:", req.body);

            const { user_id, content } = req.body;
            if (!user_id || !content) {
                return res.status(400).json({ message: "user_id and content are required" });
            }

            const result = await commentService.create(req);
            const response = responseSuccess(result, `Create comment successfully`);
            res.status(response.code).json(response);
        } catch (err) {
            next(err);
        }
    },
    findByImageId: async function (req, res, next) {
        try {
            const { id } = req.params; 

            if (!id || isNaN(id)) {
                return res.status(400).json({
                    status: "error",
                    code: 400,
                    message: "Vui lòng cung cấp image_id hợp lệ"
                });
            }

            const result = await commentService.findByImageId(parseInt(id));
            const response = responseSuccess(result, "Lấy danh sách bình luận thành công");
            res.status(response.code).json(response);
        } catch (err) {
            next(err);
        }
    },
    checkImageSaved: async function (req, res, next) {
        try {
            const result = await commentService.checkImageSaved(req); 
            const response = responseSuccess(result, `Check image saved successfully`);
            res.status(response.code).json(response);
        } catch (err) {
            next(err);
        }
    },
    

    findAll: async function (req, res, next) {
        try {
            const result = await commentService.findAll(req);
            const response = responseSuccess(result, `Get all comments successfully`);
            res.status(response.code).json(response);
        } catch (err) {
            next(err);
        }
    },

    findOne: async function (req, res, next) {
        try {
            const result = await commentService.findOne(req);
            const response = responseSuccess(result, `Get comment #${req.params.id} successfully`);
            res.status(response.code).json(response);
        } catch (err) {
            next(err);
        }
    },

    update: async function (req, res, next) {
        try {
            const result = await commentService.update(req);
            const response = responseSuccess(result, `Update comment #${req.params.id} successfully`);
            res.status(response.code).json(response);
        } catch (err) {
            next(err);
        }
    },

    remove: async function (req, res, next) {
        try {
            const result = await commentService.remove(req);
            const response = responseSuccess(result, `Remove comment #${req.params.id} successfully`);
            res.status(response.code).json(response);
        } catch (err) {
            next(err);
        }
    }
};