import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import bcrypt from 'bcryptjs'; 

export class UserController {

    async create(req: Request, res: Response) {
        const user = req.body;
        const saltRounds = 10;

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


        await bcrypt.hash(user.password, saltRounds).then(async function(hash) {
            await prismaClient.user.create({
                data: {
                    registration: user.registration,
                    name: user.name,
                    email: user.email,
                    password: hash,
                    role: user.role,
                }
            });
        });

        return res.json({ success: 'Usuário cadastrado com sucesso.' });
    }
}