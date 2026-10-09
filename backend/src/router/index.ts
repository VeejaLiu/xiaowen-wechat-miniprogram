import express from 'express';
import { env } from '../env';

const router = express.Router();

router.get('/', (req, res) => {
    const appName = env.app.name;
    res.send(`Welcome to ${appName}!`);
});

router.get('/health_check', (req, res) => {
    res.send('ok');
});

router.post('/health_check', (req, res) => {
    res.send({
        message: 'ok',
        data: req.body,
    });
});

router.use('/v1', require('./v1').default);

export default router;
