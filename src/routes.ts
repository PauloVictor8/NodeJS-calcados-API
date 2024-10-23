import { Router } from "express";
import { AuthController } from "./controllers/authController";
import { ProductController } from "./controllers/productController";
import { UserController } from "./controllers/userController";
import { authMiddleware } from "./middleware/authMiddleware";

const router = Router();
const userController = new UserController();
const authController = new AuthController();
const productController = new ProductController();

router.post('/auth/login', authController.login);

router.use(authMiddleware);

router.get('/auth/profile', authController.getProfile);
router.post('/auth/create-user', userController.create);
router.get('/users', userController.get);

router.get('/manage/products', productController.getProducts);

export { router };

