import { Router } from "express";
import { AuthController } from "./controllers/authController";
import { UserController } from "./controllers/userController";
import { authMiddleware } from "./middleware/authMiddleware";

const router = Router();
const userController = new UserController();
const authController = new AuthController();

router.post('/auth/login', authController.login);

router.use(authMiddleware);

router.get('/auth/profile', authController.getProfile);

router.get('/users', userController.get);
router.post('/users/create-user', userController.create);
router.patch('/users/edit-user/:registration', userController.patch);
router.delete('/users/delete-user/:registration', userController.delete);

export { router };

