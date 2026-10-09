import express from 'express';
import { Logger } from '../../lib/logger';
import { translate } from '../../clients/baidu-translate/BaiduTranslate';
import { PromptHistory, UserGenerateHistory } from '../../models';
import { USER_QUOTA_HISTORY_CONSTANT } from '../../constant';
import { verifyToken } from '../../lib/token/verifyToken';
import { UserQuotaHistoryService } from '../../general/user_quota_history';

const router = express.Router();
router.use(verifyToken);

const log = new Logger(__filename);

/**
 * 绘制图片
 *
 * @route POST /draw
 * @param {string} style - 绘制风格
 * @param {string} prompt - 绘制内容
 */
router.post('', async (req: any, res) => {
    try {
        log.info(`[API_LOGS][/draw] ${JSON.stringify(req.body)}`);
        const { userId } = req.user;
        let { style, prompt } = req.body;

        /*
         * prompt process
         */
        prompt = prompt.trim();
        if (!prompt || prompt.length === 0) {
            log.error(`[API_LOGS][/draw] prompt is empty`);
            return res.status(400).send('prompt is empty');
        }
        const transRes = await translate(prompt);

        /*
         * consume quota
         */
        await UserQuotaHistoryService.consumeQuotaForGenerate({ userId: userId });

        /*
         * create prompt history record
         */
        const promptHistory = await PromptHistory.create({
            prompt: prompt,
            prompt_english: transRes,
        });
        const generateHistory = await UserGenerateHistory.create({
            user_id: userId,
            style: style,
            prompt_history_id: promptHistory.id,
            status: USER_QUOTA_HISTORY_CONSTANT.STATUS.ONGOING,
            images: '',
        });

        res.send({
            generateHistoryId: generateHistory.id,
        });
    } catch (e) {
        log.error(`[API_LOGS][/draw] ${e.message}`);
        res.status(500).send({
            message: e.message,
        });
    }
});

export default router;
