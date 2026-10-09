import { User } from '../../models';
import { signToken } from '../../lib/token/signToken';
import { Logger } from '../../lib/logger';
import { env } from '../../env';
import { UserQuotaHistoryService } from '../user_quota_history';

const logger = new Logger(__filename);
const appId = env.wechatMiniProgram.appid;
const WxBizDataCrypt = require('../../clients/wechat/WXBizDataCrypt');

async function generateInviteInfo({ loginUserId, inviteBy }: { loginUserId: string; inviteBy: string }) {
    const logPre = '[login][generateInviteInfo]';

    if (!inviteBy) {
        logger.info(`${logPre} No invite by [end]`);
        return;
    }

    logger.info(`${logPre} Invite by: ${inviteBy}, login user id: ${loginUserId}`);

    const user = await User.findOne({ where: { user_id: loginUserId } });
    if (user.invited_by_user_id) {
        logger.info(`${logPre} User[${loginUserId}] already has invite user: ${user.invited_by_user_id} [end]`);
        return;
    }

    const invitedByUser = await User.getByInviteCode(inviteBy);
    if (!invitedByUser) {
        logger.error(`${logPre} invalid invite user not found, inviteBy: ${inviteBy} [end]`);
        return;
    }

    // check if invite user id is same with login user id
    const invitedByUserId = invitedByUser.user_id;
    if (loginUserId === invitedByUserId) {
        logger.info(`${logPre} Invite user id is same with login user id [end]`);
        return;
    }

    // update invite user id
    user.invited_by_user_id = invitedByUserId;
    await user.save();
    logger.info(`${logPre} Update user[${loginUserId}] invite user id to ${invitedByUserId}`);
    // update invite user quota
    await UserQuotaHistoryService.addQuotaForInvite({ userId: invitedByUserId });
    logger.info(`${logPre} Add quota for user[${invitedByUserId}]`);

    logger.info(`${logPre} success`);
}

export async function getPhoneNumber({
    inviteBy,
    code,
    sessionKey,
    encryptedData,
    userId,
    iv,
}: {
    inviteBy: any;
    code: any;
    sessionKey: any;
    encryptedData: any;
    userId: any;
    iv: any;
}): Promise<any> {
    const logPre = '[API_LOGS][/login/getPhoneNumber]';
    logger.info(`${logPre} userId: ${userId}, sessionKey: ${sessionKey}, code: ${code}`);

    const wxBizDataCrypt = new WxBizDataCrypt(appId, sessionKey);
    const data = wxBizDataCrypt.decryptData(encryptedData, iv);
    logger.info(`${logPre} ${JSON.stringify(data)}`);

    const { phoneNumber, countryCode } = data;

    const user = await User.getRawByUserId(userId);
    if (!user) {
        throw new Error(`User not found, userId: ${userId}`);
    }
    await User.updatePhoneInfo({
        userId: userId,
        phoneCode: countryCode,
        phoneNumber: phoneNumber,
    });

    await generateInviteInfo({ loginUserId: userId, inviteBy: inviteBy });

    const token = signToken(user);

    return {
        user: user,
        token: token,
    };
}
