import Router from 'express'
import PostController from "./PostController.js";
import SignInController from './Controllers/SignInController.js';
import SignUpController from './Controllers/SignUpController.js';
import { authMiddleware } from './AuthMiddleware.js';

const router = new Router()

router.post("/register", SignUpController.signUp)
router.post("/login", SignInController.signIn)

router.post('/posts', authMiddleware, PostController.create)
router.get('/posts', authMiddleware, PostController.getAll)
router.get('/posts/:id', authMiddleware, PostController.getOne)
router.put('/posts', authMiddleware, PostController.update)
router.delete('/posts/:id', authMiddleware, PostController.delete)

export default router;