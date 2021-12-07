import express from 'express';

const router = express.Router();

// Import middleware
import { requireSignin } from '../middlewares';

// Import callbacks from controllers
import { register, login, currentUser } from '../controllers/auth';

router.post('/register', register);
router.post('/login', login);
// router.get('/curent-user', requireSignin, currentUser);
router.get('/current-user', requireSignin, currentUser);

module.exports = router;
