import express from 'express';
import { Logger } from '../../lib/logger';
import { sequelize } from '../../models/db-config';
import { User, UserQuota } from '../../models';
import { verifyToken } from '../../lib/token/verifyToken';

const router = express.Router();
const logger = new Logger(__filename);

router.use(verifyToken);

/**
 * @api {get} /user/info 获取用户信息
 */
router.get('/info', async (req: any, res) => {
    logger.info(`[API_LOGS][/info] ${JSON.stringify(req.body)}`);
    const { userId } = req.user;
    logger.info(`[API_LOGS][/info] userId: ${userId}`);

    const user = await User.findOne({ where: { user_id: userId } });
    const userQuota = await UserQuota.findOne({ where: { user_id: userId } });

    res.status(200).send({
        userId: user.user_id,
        nickname: user.nickname,
        avatarUrl: user.avatar_url,
        createTime: user.create_time,
        quota: userQuota.quota,
        inviteCode: user.invite_code,
    });
});

// /**
//  * @api {post} /user/register 用户注册
//  */
// router.post('/register', async (req, res) => {
//     logger.info(`[API_LOGS][/register] ${JSON.stringify(req.body)}`);
//     const { nickname, avatarUrl, openId, appId, unionId, sessionKey, accessKey } = req.body;
//
//     /*
//      * Create a new user
//      */
//     const newUser = await User.create({
//         nickname: nickname,
//         avatar_url: avatarUrl,
//         user_id: uuidv4(),
//         appid: appId,
//         openid: openId,
//         unionid: unionId,
//         session_key: sessionKey,
//         access_token: accessKey,
//     });
//
//     /*
//      * Init user quota
//      */
//     await UserQuotaHistory.create({
//         user_id: newUser.user_id,
//         quota_before: 0,
//         quota_after: 200,
//         change_amount: 200,
//         change_type: USER_QUOTA_HISTORY.CHANGE_TYPE.ADD,
//         change_reason: USER_QUOTA_HISTORY.CHANGE_REASON.ADD.REGISTER,
//     });
//     await UserQuota.create({
//         user_id: newUser.user_id,
//         quota: 200,
//     });
//
//     res.status(200).send();
// });

export default router;
