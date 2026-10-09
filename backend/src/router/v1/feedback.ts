import express from 'express';
import { Logger } from '../../lib/logger';
import { verifyToken } from '../../lib/token/verifyToken';
import UserFeedback from '../../models/schema/user_feedback';

const router = express.Router();

const logger = new Logger(__filename);

router.use(verifyToken);

/**
 * @api {post} /api/v1/feedback/ 提交反馈
 */
router.post('/', async (req: any, res) => {
    const { userId } = req.user;
    const { rate, content } = req.body;

    logger.info(`[/feedback] userId: ${userId}, rate: ${rate}, content: ${content}`);
    if (!rate || !content || !userId) {
        res.send({
            success: false,
            message: '参数错误',
        });
        return;
    }

    await UserFeedback.create({
        user_id: userId,
        rate: Number(rate),
        content: content,
    });

    res.send({
        success: true,
    });
});

export default router;
