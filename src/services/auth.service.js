import { ACCESS_TOKEN_EXPIRED, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRED, REFRESH_TOKEN_SECRET } from "../common/constant/app.constant.js";
import { BadRequestException, UnauthorizedException } from "../common/helpers/error.helper.js";
import sendMail from "../common/nodemailer/send-mail.nodemailer.js";
import prisma from "../common/prisma/init.prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const authService = {
    register: async (req) => {
        const { full_name, email, pass_word } = req.body;
        const userExists = await prisma.users.findFirst({
            where: {
                email: email,
            },
        });

        if (userExists) {
            throw new BadRequestException(`Tài khoản đã tồn tại, Vui lòng đăng nhập`);
        }

        // mã hoá password
        const passHash = bcrypt.hashSync(pass_word, 10);

        const userNew = await prisma.users.create({
            data: {
                email: email,
                full_name: full_name,
                pass_word: passHash,
            },
        });

        delete userNew.pass_word;

        sendMail(`lamphong498@gmail.com`).catch((err) => {
            console.log(`Lỗi gửi email:`, err);
        });

        return userNew;
    },
    login: async (req) => {
        const { email, pass_word } = req.body;
        console.log({ email, pass_word });

        const userExists = await prisma.users.findFirst({
            where: {
                email: email,
            },
        });

        if (!userExists) {
            throw new BadRequestException(`Tài khoản chưa tồn tại, Vui lòng đăng ký`);
        }

        if (!userExists.pass_word) {
            if (userExists.face_app_id) {
                throw new BadRequestException(`Vui lòng đăng nhập bằng facebook, để tạo mật khẩu mới`)
            }
            if (userExists.goole_id) {
                throw new BadRequestException(`Vui lòng đăng nhập bằng google, để tạo mật khẩu mới`)
            }
            throw new BadRequestException(`Không hợp lệ, vui lòng liên hệ chăm sóc khách hàng`)

        }

        // so sánh password
        const isPassword = bcrypt.compareSync(pass_word, userExists.pass_word);
        if (!isPassword) {
            throw new BadRequestException(`Mật khẩu không chính xác`);
        }

        const tokens = authService.createTokens(userExists.user_id);

        return tokens;
    },
    refreshToken: async (req) => {
        const refreshToken = req.headers.authorization?.split(" ")[1];

        if (!refreshToken) {
            throw new UnauthorizedException(`Vui lòng cung cấp token để tiếp tục sử dụng`);
        }
        const accessToken = req.headers['x-access-token']
        if (!accessToken) {
            throw new UnauthorizedException(`Vui lòng cung cấp token để tiếp tục sử dụng`);
        }

        const decodeRefreshToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
        const decodeAccessToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET, {
            ignoreExpiration: true
        });
        console.log({ decodeRefreshToken, decodeAccessToken });

        if (decodeRefreshToken.userId !== decodeAccessToken.userId) {
            throw new UnauthorizedException(`Cặp Token không hợp lệ`);

        }
        const userExists = await prisma.users.findUnique({
            where: {
                user_id: decodeRefreshToken.userId,
            }
        })

        if (!userExists) throw new UnauthorizedException(`User không tồn tại`);


        const tokens = authService.createTokens(userExists.user_id);

        return tokens
    },
    create: async function (req) {
        return `This action create`;
    },

    findAll: async function (req) {
        return `This action returns all auth`;
    },

    findOne: async function (req) {
        return `This action returns a id: ${req.params.id} auth`;
    },

    update: async function (req) {
        return `This action updates a id: ${req.params.id} auth`;
    },

    remove: async function (req) {
        return `This action removes a id: ${req.params.id} auth`;
    },

    // function
    createTokens: (userId) => {
        if (!userId) throw new BadRequestException(`Không có userId để tạo token`);

        const accessToken = jwt.sign({ userId: userId }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRED });

        const refreshToken = jwt.sign({ userId: userId }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRED });

        return {
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    }
};