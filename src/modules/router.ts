import { Router } from 'express';
import { GreetingController } from './greeting/greeting.controller';

const router = Router();

router.use('/greetings', GreetingController.router);

export const apiRouter = router;
