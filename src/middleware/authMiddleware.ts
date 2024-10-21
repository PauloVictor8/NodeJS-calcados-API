import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { prismaClient } from "../database/prismaClient";

type JwtPayload = {
    registration: string;
}

const validateToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload;
  } catch {
    return null;
  }
};

const getUserByRegistration = async (registration: string) => {
  return await prismaClient.user.findFirst({
    select: {
      registration: true,
      name: true,
      email: true,
      role: true,
    },
    where: {
      registration
    },
  });
};

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ error: 'Missing authorization header' });
    }

    const token = authorization.split(' ').slice(1).join(' ');
    const payload = validateToken(token);

    if (!payload) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const user = await getUserByRegistration(payload.registration);

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    next();
};