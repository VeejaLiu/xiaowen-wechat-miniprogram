import express from 'express';
import { Logger } from '../../lib/logger';
import { UserGenerateHistory, UserQuota, UserQuotaHistory } from '../../models';
import { USER_QUOTA_HISTORY_CONSTANT } from '../../constant';
import { verifyToken } from '../../lib/token/verifyToken';

const router = express.Router();

const logger = new Logger(__filename);

router.use(verifyToken);

/**
 * @api {post} /notification/subscribe 订阅消息通知
 */
router.post('/subscribe', async (req: any, res) => {
    const { userId } = req.user;
    const { generateHistoryId } = req.body;
    logger.info(`[API_LOGS][/subscribe] userId: ${userId}, generateHistoryId: ${generateHistoryId}`);

    const userGenerateHistory = await UserGenerateHistory.findOne({ where: { id: generateHistoryId } });
    if (!userGenerateHistory) {
        res.send({
            success: false,
            message: 'generateHistoryId not found',
        });
        return;
    }

    userGenerateHistory.notification = 1;
    await userGenerateHistory.save();

    res.send({
        success: true,
    });
});

export default router;
