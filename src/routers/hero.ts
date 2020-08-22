import { Router } from 'express';
import { getHeroById, getHeroes } from '../controller/hero';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.get('/', authMiddleware, getHeroes);
router.get('/:id', authMiddleware, getHeroById);

export default router;
