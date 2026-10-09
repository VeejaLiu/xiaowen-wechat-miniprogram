import express from 'express';
import { Logger } from '../../lib/logger';
import { translate } from '../../clients/baidu-translate/BaiduTranslate';
import { draw } from '../../clients/generate-server/generate';
import { PromptHistory, UserGenerateHistory } from '../../models';
import { USER_QUOTA_HISTORY } from '../../constant';

const router = express.Router();
const log = new Logger(__filename);

/**
 * Draw
 */
router.post('', async (req, res) => {
    log.info(`[API_LOGS][/draw] ${JSON.stringify(req.body)}`);
    let { user_id, style, prompt } = req.body;

    // TODO check this user's quota

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
     * create prompt history record
     */
    const promptHistory = await PromptHistory.create({
        prompt: prompt,
        prompt_english: transRes,
    });
    const generateHistory = await UserGenerateHistory.create({
        user_id: user_id,
        style: style,
        prompt_history_id: promptHistory.id,
        status: USER_QUOTA_HISTORY.STATUS.ONGOING,
        images: '',
    });

    /*
     * draw
     */
    const result = await draw({ style: style, prompt: transRes });

    // update generate history
    await generateHistory.update({
        status: USER_QUOTA_HISTORY.STATUS.SUCCESS,
        images: JSON.stringify(result.images),
        generate_used_time: result.used_time,
    });

    // TODO consume user's quota

    res.send(result);
});

export default router;
