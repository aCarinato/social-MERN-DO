import express from 'express';

const router = express.Router();

// Import middleware
import { requireSignin } from '../middlewares';

// Import callbacks from controllers
import {
  register,
  login,
  currentUser,
  forgotPassword,
} from '../controllers/auth';

router.post('/register', register);
router.post('/login', login);
router.get('/current-user', requireSignin, currentUser);
router.post('/forgot-password', forgotPassword);

module.exports = router;
