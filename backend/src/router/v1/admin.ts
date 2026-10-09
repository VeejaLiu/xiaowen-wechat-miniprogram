import express from 'express';
import { Logger } from '../../lib/logger';
import { translate } from '../../clients/baidu-translate/BaiduTranslate';
import { PromptHistory, UserGenerateHistory } from '../../models';
import { USER_QUOTA_HISTORY_CONSTANT } from '../../constant';
import { sequelize } from '../../models/db-config';

const router = express.Router();

const logger = new Logger(__filename);

/**
 * 绘制图片
 *
 * @route POST /draw
 * @param {string} style - 绘制风格
 * @param {string} prompt - 绘制内容
 *
 */
router.post('/draw', async (req: any, res) => {
    logger.info(`[API_LOGS][/draw] ${JSON.stringify(req.body)}`);
    const { prompt } = req.body;
    const transRes = await translate(prompt);
    console.log(transRes);
    res.status(200).send({
        generateHistoryId: 0,
        translateRes: transRes,
    });
    // let { style, prompt } = req.body;
    //
    // /*
    //  * prompt process
    //  */
    // prompt = prompt.trim();
    // if (!prompt || prompt.length === 0) {
    //     logger.error(`[API_LOGS][/draw] prompt is empty`);
    //     return res.status(400).send('prompt is empty');
    // }
    // const transRes = await translate(prompt);
    //
    // /*
    //  * create prompt history record
    //  */
    // const promptHistory = await PromptHistory.create({
    //     prompt: prompt,
    //     prompt_english: transRes,
    // });
    // const generateHistory = await UserGenerateHistory.create({
    //     user_id: 'admin',
    //     style: style,
    //     prompt_history_id: promptHistory.id,
    //     status: USER_QUOTA_HISTORY_CONSTANT.STATUS.ONGOING,
    //     images: '',
    // });
    //
    // logger.info(`[API_LOGS][/draw] generateHistory: ${JSON.stringify(generateHistory.id)}`);
    // res.send({
    //     generateHistoryId: generateHistory.id,
    // });
});

router.get('/history', async (req: any, res) => {
    logger.info(`[API_LOGS][/history] ${JSON.stringify(req.query)}`);
    let { page, pageSize } = req.query;
    page = parseInt(page) || 1;
    pageSize = parseInt(pageSize) || 10;
    const sqlRes = await sequelize.query(`
        select ugh.id                 as id,
               ugh.user_id            as user_id,
               ugh.style              as style,
               ph.prompt              as prompt,
               ph.prompt_english      as prompt_english,
               ugh.generate_used_time as generate_used_time,
               ugh.status             as status,
               ugh.images             as images,
               ugh.create_time        as create_time
        from user_generate_history as ugh
                 left join prompt_history as ph on ugh.prompt_history_id = ph.id
        ORDER BY ugh.id DESC
        limit ${(page - 1) * pageSize}, ${pageSize}`);
    const countSqlRes = await sequelize.query(`
        select count(ugh.id) as count from user_generate_history as ugh
        left join prompt_history as ph on ugh.prompt_history_id = ph.id`);
    const history = sqlRes[0].map((item: any) => ({
        id: item.id,
        userId: item.user_id,
        style: item.style,
        prompt: item.prompt,
        promptEnglish: item.prompt_english,
        generateUsedTime: item.generate_used_time,
        status: item.status,
        images: JSON.parse(item?.images?.length > 0 ? item.images : '[]'),
        createTime: item.create_time,
    }));

    res.send({
        history: history,
        total: (countSqlRes[0][0] as any).count,
    });
});
export default router;
