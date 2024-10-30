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

router.get('/users', userController.get);
router.get('/users/user/:registration', userController.getUserByRegistration);

router.get('/users/roles', userController.getRoles);
router.post('/users/create-user', userController.create);
router.patch('/users/edit-user/:registration', userController.patch);
router.delete('/users/delete-user/:registration', userController.delete);

router.get('/manage/products', productController.getProducts);

router.get('/manage/products', productController.getProducts);
router.post('/manage/products/register', productController.registerProduct);
router.get('/manage/products/getall', productController.getProducts);

export { router };

