import express from 'express';
import { Logger } from '../../lib/logger';
import { sequelize } from '../../models/db-config';
import { User, UserQuota, UserQuotaHistory } from '../../models';
import { v4 as uuidv4 } from 'uuid';
import { USER_QUOTA_HISTORY } from '../../constant/user_quota_history';

const router = express.Router();

const log = new Logger(__filename);

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
router.get('/history', async (req, res) => {
    const { userId, start, limit } = req.query;

    const sqlRes = await UserQuotaHistory.findAll({
        where: {
            user_id: userId,
        },
        order: [['id', 'DESC']],
        offset: Number(start) || 0,
        limit: Number(limit) || 20,
    });

    res.send(sqlRes);
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
        change_type: USER_QUOTA_HISTORY.CHANGE_TYPE.ADD,
        change_reason: USER_QUOTA_HISTORY.CHANGE_REASON.ADD.RECHARGE,
    });
    await userQuota.update({ quota: newQuota });

    res.send({
        quota: newQuota,
    });
});

export default router;
