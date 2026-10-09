import express from 'express';
import { Logger } from '../../lib/logger';
import { login } from '../../general/user/login';
import { getPhoneNumber } from '../../general/user/getPhoneNumber';

const router = express.Router();
const logger = new Logger(__filename);

/**
 * @api {get} /login 用户登录
 */
router.post('', async (req, res) => {
    logger.info(`[API_LOGS][/login] ${JSON.stringify(req.body)}`);
    const { code, inviteCode } = req.body;
    try {
        const result = await login({ code: code });
        res.status(200).send(result);
    } catch (e) {
        logger.error(`[API_LOGS][/login] ${e.message}`);
        res.status(500).send({
            success: false,
            message: e.message,
        });
    }
});

/**
 * @api {get} /login/getPhoneNumber 获取用户手机号
 */
router.post('/getPhoneNumber', async (req: any, res) => {
    const { user_id: userId, inviteBy, encryptedData, iv, code, session_key: sessionKey } = req.body;
    try {
        const result = await getPhoneNumber({ userId, inviteBy, encryptedData, iv, code, sessionKey });
        res.status(200).send({
            success: true,
            data: result,
        });
    } catch (e) {
        logger.error(`[API_LOGS][/login/getPhoneNumber] ${e.message}`);
        res.status(400).send({
            success: false,
            message: e.message,
        });
    }
});

export default router;
