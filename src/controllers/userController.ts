import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import bcrypt from 'bcryptjs'; 

export class UserController {

    async create(req: Request, res: Response) {
        const user = req.body;

        const existingUser = await prismaClient.user.findFirst({
            where: {
              OR: [
                { registration: user.registration },
                { email: user.email }, 
              ]
            }
          });
      
        if (existingUser) {
            if (existingUser.registration === user.registration) {
                return res.status(409).json({ error: 'Usuário já cadastrado.' });
            } else {
                return res.status(400).json({ error: 'Email já cadastrado.' });
            }
        }

        const hashPassword = await bcrypt.hash(user.password, 10);

        await prismaClient.user.create({
            data: {
                registration: user.registration,
                name: user.name,
                email: user.email,
                password: hashPassword,
                role: user.role,
            }
        });

        return res.json({ success: 'Usuário cadastrado.' });
    }
}