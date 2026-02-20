import { Router } from 'express';
import { loginHandler, registerHandler, sendOtpHandler, verifyOtpHandler } from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import { loginSchema, registerSchema, sendOtpSchema, verifyOtpSchema } from '../validators/auth.validator';

const router = Router();

router.post('/login', validate(loginSchema), loginHandler);
router.post('/register', validate(registerSchema), registerHandler);
router.post('/send-otp', validate(sendOtpSchema), sendOtpHandler);
router.post('/verify-otp', validate(verifyOtpSchema), verifyOtpHandler);

export default router;
