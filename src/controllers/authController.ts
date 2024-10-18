import bcrypt from 'bcryptjs';
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { prismaClient } from "../database/prismaClient";

export class AuthController {

    async login(req: Request, res: Response) {
        const { registration, password } = req.body;

        const user = await prismaClient.user.findFirst({
            select: {
                registration: true,
                password: true,
            },
            where: {
                registration
            },
        });

        if(user) {
            if(await bcrypt.compare(password, user.password)) {
                const token = jwt.sign({ registration: user.registration }, process.env.JWT_PASS ?? '', {
                    expiresIn: '8h',
                });

                console.log(user);

                return res.json({
                    token: token,
                    user: user
                });

            }
        }


        return res.status(401).json({ error: 'Matrícula ou senha incorretos. Por favor, tente novamente.' });
    }

    async getProfile(req: Request, res: Response) {
        return res.json(req.user);
    }
}