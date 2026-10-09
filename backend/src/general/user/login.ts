import { WechatApis } from '../../clients/wechat/WechatApis';
import { User } from '../../models';
import { v4 as uuidv4 } from 'uuid';
import { UserQuotaHistoryService } from '../user_quota_history';
import { Logger } from '../../lib/logger';
import { env } from '../../env';
import { putObject } from '../../clients/minio/minio';
const fetch = require('node-fetch');

const logger = new Logger(__filename);
const appId = env.wechatMiniProgram.appid;

async function generateInviteCode() {
    const inviteCode = uuidv4().substring(0, 4);
    const user = await User.getByInviteCode(inviteCode);
    if (user) {
        return generateInviteCode();
    }
    return inviteCode;
}

export async function generateAvatarByUserID(id: number) {
    const user = await User.findByPk(id);

    /*
     * Download this img and save to user.avatar_url
     */
    const url =
        `https://api.dicebear.com/9.x/pixel-art/png` +
        `?seed=${id}` +
        `&size=128` +
        `&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
    const avatarResponse = await fetch(url);
    const avatarBuffer = await avatarResponse.buffer();
    const avatarName = `avatar_${id}.png`;
    const avatarMinioPath = await putObject(avatarName, avatarBuffer);
    logger.info(`[generateAvatar] avatarMinioPath: ${avatarMinioPath}`);
    await user.update({ avatar_url: avatarMinioPath });
}

export async function login({ code }: { code: string }): Promise<{
    userId?: string;
    nickname?: string;
    sessionKey?: string;
    inviteCode?: string;
}> {
    logger.info(`[login] code: ${code}`);
    if (!code || code === '') {
        throw new Error('Missing code');
    }
    const wxRes = await WechatApis.code2session(code);
    const { openid, session_key } = wxRes;
    logger.info(`[login] ${JSON.stringify(wxRes)}`);

    //查询数据库中是否有该用户
    let user = await User.findOne({ where: { openid: openid } });

    const result: {
        userId?: string;
        nickname?: string;
        sessionKey?: string;
        inviteCode?: string;
    } = {};

    if (user) {
        logger.info(`[login] Login success, user_id: ${user.user_id}, openid: ${openid}`);

        if (session_key !== user.session_key) {
            logger.info(`[login] session_key changed, user_id: ${user.user_id}, openid: ${openid}`);
            await user.update({ session_key: session_key });
        }

        //如果有该用户
        result.userId = user.user_id;
        result.nickname = user.nickname;
        result.sessionKey = user.session_key;
        result.inviteCode = user.invite_code;
    } else {
        logger.info(`[login] New user, openid: ${openid}`);
        const inviteCode = await generateInviteCode();
        logger.info(`[login] Invite code: ${inviteCode}`);
        //如果没有该用户，创建一个新用户
        user = await User.create({
            nickname: 'wx_' + inviteCode,
            avatar_url: '',
            user_id: uuidv4(),
            appid: appId,
            openid: openid,
            unionid: '',
            session_key: session_key,
            access_token: '',
            invite_code: inviteCode,
        });
        logger.info(`[login] New user created, user_id: ${user.user_id}, openid: ${openid}`);
        await UserQuotaHistoryService.initQuota({ userId: user.user_id });
        generateAvatarByUserID(user.id).then(() => {
            logger.info(`[login] Generate avatar by userID${user.id} success`);
        });

        result.userId = user.user_id;
        result.nickname = user.nickname;
        result.sessionKey = user.session_key;
        result.inviteCode = user.invite_code;
    }
    return result;
}
