import { Router } from 'express';
import heros from './hero';

const router = Router();

router.use('/heroes', heros);

export default router;
