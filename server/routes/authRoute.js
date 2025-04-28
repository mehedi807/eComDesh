import express from 'express';
import { signup, login, logout, deleteUser, checkAuth } from '../controller/authController.js'
//import { protectRoute } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

// router.get('/check', protectRoute, checkAuth);
// router.post('/logout', logout);
// router.delete('/removeUser/:email', deleteUser);

export default router;