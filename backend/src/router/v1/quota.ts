import express from 'express';
import { Logger } from '../../lib/logger';
import { UserQuota, UserQuotaHistory } from '../../models';
import { USER_QUOTA_HISTORY_CONSTANT } from '../../constant';
import { verifyToken } from '../../lib/token/verifyToken';

const router = express.Router();

const logger = new Logger(__filename);

router.use(verifyToken);

/**
 * @api {post} /quota 获取用户剩余配额
 */
router.get('', async (req, res) => {
    const { userId } = req.query;

    const sqlRes = await UserQuota.findOne({
        where: {
            user_id: userId,
        },
    });

    res.send({
        quota: sqlRes.quota,
    });
});

/**
 * @api {get} /quota/history 获取用户配额变更历史
 */
router.get('/history', async (req: any, res) => {
    const userId = req.user.userId;
    const { start, limit } = req.query;

    logger.info(`[API_LOGS][/quota/history] userId: ${userId}`);

    const sqlRes = await UserQuotaHistory.findAll({
        where: {
            user_id: userId,
        },
        order: [['id', 'DESC']],
        offset: Number(start) || 0,
        limit: Number(limit) || 20,
        raw: true,
    });

    res.send(
        sqlRes.map((item) => {
            return {
                id: item.id,
                changeType: +item.change_type,
                amount: item.change_amount,
                reason: +item.change_reason,
            };
        }),
    );
});

/**
 * 充值增加配额
 *
 * @api {post} /quota/recharge 充值增加配额
 */
router.post('/recharge', async (req, res) => {
    const { userId, amount } = req.body;

    const userQuota = await UserQuota.findOne({
        where: {
            user_id: userId,
        },
    });
    const newQuota = Number(userQuota.quota) + (Number(amount) || 0);

    await UserQuotaHistory.create({
        user_id: userId,
        quota_before: userQuota.quota,
        quota_after: newQuota,
        change_amount: amount,
        change_type: USER_QUOTA_HISTORY_CONSTANT.CHANGE_TYPE.ADD,
        change_reason: USER_QUOTA_HISTORY_CONSTANT.CHANGE_REASON.ADD.RECHARGE,
    });
    await userQuota.update({ quota: newQuota });

    res.send({
        quota: newQuota,
    });
});

export default router;
