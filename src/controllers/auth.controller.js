import { responseSuccess } from "../common/helpers/reposonse.help.js";
import { authService } from "../services/auth.service.js";

export const authController = {
    register: async (req, res, next) => {
        try {
            const userNew = await authService.register(req);
            const resData = responseSuccess(userNew, `Register Successfully`, 200);
            res.status(resData.code).json(resData);
        } catch (error) {
            next(error)
        }
    },
    login: async (req, res, next) => {
        try {
            const data = await authService.login(req);
            const resData = responseSuccess(data, `Login Successfully`, 200);
            res.status(resData.code).json(resData);
        } catch (error) {
            next(error)
        }
    },
    refreshToken:  async (req, res, next) => {
        try {
           const data = await authService.refreshToken(req);
           const resData = responseSuccess(data, `Refresh Token Successfully`, 200);
           res.status(resData.code).json(resData);
        } catch (error) {
           next(error)
        }
     },
    create: async function (req, res, next) {
        try {
            const result = await authService.create(req);
            const response = responseSuccess(result, `Create auth successfully`);
            res.status(response.code).json(response);
        } catch (err) {
            next(err);
        }
    },

    findAll: async function (req, res, next) {
        try {
            const result = await authService.findAll(req);
            const response = responseSuccess(result, `Get all auths successfully`);
            res.status(response.code).json(response);
        } catch (err) {
            next(err);
        }
    },

    findOne: async function (req, res, next) {
        try {
            const result = await authService.findOne(req);
            const response = responseSuccess(result, `Get auth #${req.params.id} successfully`);
            res.status(response.code).json(response);
        } catch (err) {
            next(err);
        }
    },

    update: async function (req, res, next) {
        try {
            const result = await authService.update(req);
            const response = responseSuccess(result, `Update auth #${req.params.id} successfully`);
            res.status(response.code).json(response);
        } catch (err) {
            next(err);
        }
    },

    remove: async function (req, res, next) {
        try {
            const result = await authService.remove(req);
            const response = responseSuccess(result, `Remove auth #${req.params.id} successfully`);
            res.status(response.code).json(response);
        } catch (err) {
            next(err);
        }
    }
};