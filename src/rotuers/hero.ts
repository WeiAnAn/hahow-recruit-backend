import { Router } from 'express';
import { getHeroById, getHeroes } from '../controller/hero';

const router = Router();

router.get('/', getHeroes);
router.get('/:id', getHeroById);

export default router;
