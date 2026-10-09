import express from 'express';
import { Logger } from '../../lib/logger';
import { sequelize } from '../../models/db-config';
import { verifyToken } from '../../lib/token/verifyToken';

const router = express.Router();
const logger = new Logger(__filename);

router.use(verifyToken);

/**
 * @api {get} /history 获取用户生成历史
 */
router.get('', async (req: any, res) => {
    logger.info(`[API_LOGS][/history] ${JSON.stringify(req.body)}`);
    const { keyword, style, start = 0, limit = 5 } = req.query;
    const { userId } = req.user;
    logger.info(`[API_LOGS][/history] userId: ${userId}`);

    const sqlRes = await sequelize.query(`
        select ugh.id                 as id,
               ugh.user_id            as user_id,
               ugh.style              as style,
               ph.prompt              as prompt,
               ugh.generate_used_time as generate_used_time,
               ugh.status             as status,
               ugh.images             as images,
               ugh.create_time        as create_time
        from user_generate_history as ugh
                 left join prompt_history as ph
                           on ugh.prompt_history_id = ph.id
        WHERE ugh.user_id = '${userId}'
            ${style ? `AND ugh.style = '${style}'` : ''} 
            ${keyword ? `AND ph.prompt LIKE '%${keyword}%'` : ''}
        ORDER BY ugh.id DESC
        limit ${Number(start)}, ${Number(limit)}`);
    // LIMIT ${Number(start) || 0}, ${Number(limit) || 10};
    const countSqlRes = await sequelize.query(`
        select count(ugh.id) as count
        from user_generate_history as ugh
                 left join prompt_history as ph
                           on ugh.prompt_history_id = ph.id
        WHERE ugh.user_id = '${userId}'
            ${style ? `AND ugh.style = '${style}'` : ''}
            ${keyword ? `AND ph.prompt LIKE '%${keyword}%'` : ''}
    `);

    res.status(200).send({
        data: sqlRes[0].map((item: any) => ({
            id: item.id,
            userId: item.user_id,
            style: item.style,
            prompt: item.prompt,
            generateUsedTime: item.generate_used_time,
            status: item.status,
            images: JSON.parse(item.images || '[]'),
            createTime: item.create_time,
        })),
        total: (countSqlRes[0][0] as any).count,
    });
});

/**
 * @api {get} /history/{id} 获取用户生成历史详情
 */
router.get('/:generate_history_id', async (req: any, res) => {
    const { generate_history_id } = req.params;
    const userId = req.user.userId;
    logger.info(`[API_LOGS][/history/${generate_history_id}] userId: ${userId}`);

    const sqlRes = await sequelize.query(`
        select ugh.id                 as id,
               ugh.user_id            as user_id,
               ugh.style              as style,
               ph.prompt              as prompt,
               ugh.generate_used_time as generate_used_time,
               ugh.status             as status,
               ugh.images             as images,
               ugh.create_time        as create_time
        from user_generate_history as ugh
                 left join prompt_history as ph
                           on ugh.prompt_history_id = ph.id
        WHERE ugh.user_id = '${userId}'
          AND ugh.id = ${generate_history_id}`);
    const item: any = sqlRes[0][0];

    if (!item) {
        res.status(404).send({
            message: 'Not Found',
        });
        return;
    }

    res.status(200).send({
        id: item.id,
        userId: item.user_id,
        style: item.style,
        prompt: item.prompt,
        generateUsedTime: item.generate_used_time,
        status: item.status,
        images: JSON.parse(item.images || '[]'),
        createTime: item.create_time,
    });
});
export default router;
