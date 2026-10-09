import { UserQuota, UserQuotaHistory } from '../models';
import { QUOTA_CONSTANT, USER_QUOTA_HISTORY_CONSTANT } from '../constant';
import { Logger } from '../lib/logger';

const logger = new Logger(__filename);
export class UserQuotaHistoryService {
    /**
     * 新用户注册，初始化配额
     */
    static async initQuota({ userId }: { userId: string }) {
        try {
            /*
             * Init user quota
             */
            await UserQuotaHistory.create({
                user_id: userId,
                quota_before: 0,
                quota_after: QUOTA_CONSTANT.INIT,
                change_amount: QUOTA_CONSTANT.INIT,
                change_type: USER_QUOTA_HISTORY_CONSTANT.CHANGE_TYPE.ADD,
                change_reason: USER_QUOTA_HISTORY_CONSTANT.CHANGE_REASON.ADD.REGISTER,
            });
            await UserQuota.create({
                user_id: userId,
                quota: QUOTA_CONSTANT.INIT,
            });
        } catch (e) {
            logger.error(`[userQuotaHistoryService][initQuota] ${e.message}`);
            throw e;
        }
    }

    /**
     * 生成消费，减少配额
     */
    static async consumeQuotaForGenerate({ userId }: { userId: string }) {
        try {
            // check this user's quota
            const userQuota = await UserQuota.getByUserId(userId);
            if ((userQuota?.quota || 0) < QUOTA_CONSTANT.GENERATE) {
                throw new Error(`user's quota is not enough`);
            }
            // consume user's quota
            await UserQuotaHistory.addHistory({
                userId: userId,
                changeType: USER_QUOTA_HISTORY_CONSTANT.CHANGE_TYPE.SUBTRACT,
                changeReason: USER_QUOTA_HISTORY_CONSTANT.CHANGE_REASON.SUBTRACT.GENERATE,
                quotaBefore: userQuota.quota,
                changeAmount: QUOTA_CONSTANT.GENERATE,
                quotaAfter: userQuota.quota - QUOTA_CONSTANT.GENERATE,
            });
            // update user's quota
            await userQuota.update({
                quota: userQuota.quota - QUOTA_CONSTANT.GENERATE,
            });
            return true;
        } catch (e) {
            logger.error(`[userQuotaHistoryService][consumeQuotaForGenerate] ${e.message}`);
            throw e;
        }
    }

    /**
     * 生成失败，退回配额
     */
    static async refundQuotaForGenerate({ userId }: { userId: string }) {
        try {
            const userQuota = await UserQuota.getByUserId(userId);
            // refund user's quota
            await UserQuotaHistory.addHistory({
                userId: userId,
                changeType: USER_QUOTA_HISTORY_CONSTANT.CHANGE_TYPE.ADD,
                changeReason: USER_QUOTA_HISTORY_CONSTANT.CHANGE_REASON.ADD.REFUND_BY_GENERATE_FAILED,
                quotaBefore: userQuota.quota,
                changeAmount: QUOTA_CONSTANT.GENERATE,
                quotaAfter: userQuota.quota + QUOTA_CONSTANT.GENERATE,
            });
            // update user's quota
            await userQuota.update({
                quota: userQuota.quota + QUOTA_CONSTANT.GENERATE,
            });
            return true;
        } catch (e) {
            logger.error(`[userQuotaHistoryService][refundQuotaForGenerate] ${e.message}`);
            throw e;
        }
    }

    static async addQuotaForInvite({ userId }: { userId: any }) {
        const logPre = `[userQuotaHistoryService][addQuotaForInvite][${userId}]`;
        try {
            const userQuota = await UserQuota.getByUserId(userId);
            logger.info(`${logPre} current quota: ${userQuota.quota}`);
            // refund user's quota
            const quotaHistory = await UserQuotaHistory.addHistory({
                userId: userId,
                changeType: USER_QUOTA_HISTORY_CONSTANT.CHANGE_TYPE.ADD,
                changeReason: USER_QUOTA_HISTORY_CONSTANT.CHANGE_REASON.ADD.INVITE_REGISTER,
                quotaBefore: userQuota.quota,
                changeAmount: QUOTA_CONSTANT.INVITE_REGISTER,
                quotaAfter: userQuota.quota + QUOTA_CONSTANT.INVITE_REGISTER,
            });
            logger.info(`${logPre} add quota history, id: ${quotaHistory.id}`);
            // update user's quota
            await userQuota.update({
                quota: userQuota.quota + QUOTA_CONSTANT.INVITE_REGISTER,
            });
            logger.info(`${logPre} update quota, quota: ${userQuota.quota}`);
            return true;
        } catch (e) {
            logger.error(`[userQuotaHistoryService][addQuotaForInvite] ${e.message}`);
            throw e;
        }
    }
}
