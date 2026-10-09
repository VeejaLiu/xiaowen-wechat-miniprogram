import express from 'express';

const router = express.Router();

router.use('/draw', require('./draw').default);
router.use('/user', require('./user').default);
router.use('/quota', require('./quota').default);

export default router;
