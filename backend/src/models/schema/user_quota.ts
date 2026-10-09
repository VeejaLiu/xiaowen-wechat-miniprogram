import Sequelize, { Model, ModelAttributes } from 'sequelize';
import { sequelize, Defaultconfig } from '../db-config';
import { Logger } from '../../lib/logger';

const logger = new Logger(__filename);

const UserQuotaSchema: ModelAttributes = {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: Sequelize.STRING(36),
    },
    quota: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    create_time: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    update_time: {
        type: Sequelize.DATE,
        allowNull: false,
    },
};

class UserQuota extends Model {
    public id!: number;
    public user_id!: string;
    public quota!: number;
    public create_time!: Date;
    public update_time!: Date;

    /**
     * 获取记录by user_id
     */
    public static async getByUserId(userId: string): Promise<UserQuota> {
        try {
            const sqlRes = await UserQuota.findOne({
                where: { user_id: userId },
            });
            return sqlRes;
        } catch (e) {
            logger.error(`[UserQuota][getByUserId] ${e}`);
            return null;
        }
    }

    /**
     * 获取用户剩余配额
     */
    public static async getQuota(userId: string): Promise<number> {
        try {
            const sqlRes = await UserQuota.findOne({
                where: { user_id: userId },
            });
            return sqlRes.quota;
        } catch (e) {
            logger.error(`[UserQuota][getQuota] ${e}`);
            return 0;
        }
    }
}

UserQuota.init(UserQuotaSchema, {
    ...Defaultconfig,
    sequelize,
    modelName: 'user_quota',
});

export default UserQuota;
