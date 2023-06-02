import { Router } from 'express';
import { greetings } from './handlers/greeting';

const GreetingRouter = Router();

GreetingRouter.get('/', greetings);

export const GreetingController = { router: GreetingRouter };
