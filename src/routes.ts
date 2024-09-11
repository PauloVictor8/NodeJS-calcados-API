import { Router } from "express";
import { UserController } from "./controllers/userController";
import { AuthController } from "./controllers/authController";
import { authMiddleware } from "./middleware/authMiddleware";

const router = Router();
const userController = new UserController();
const authController = new AuthController();

router.post('/auth/login', authController.login);

router.use(authMiddleware);

router.get('/auth/profile', authController.getProfile);
router.post('/auth/create-user', userController.create);

export { router };
