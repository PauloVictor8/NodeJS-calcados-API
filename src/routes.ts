import { Router } from "express";
import { UserController } from "./controllers/userController";

const router = Router();
const userController = new UserController();

router.post('/auth/create-user', userController.create);

router.get('/auth/login', (_, res) => {
    return res.send('Olá, DEV!');
});

export { router };
