import Sequelize, { Model, ModelAttributes } from 'sequelize';
import { sequelize, Defaultconfig } from '../db-config';

const UserQuotaHistorySchema: ModelAttributes = {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: Sequelize.STRING(36),
    },
    quota_before: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    quota_after: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    change_amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    change_type: {
        type: Sequelize.STRING(20),
        allowNull: false,
    },
    change_reason: {
        type: Sequelize.STRING(255),
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

class UserQuotaHistory extends Model {
    public id!: number;
    public user_id!: string;
    public quota_before!: number;
    public quota_after!: number;
    public change_amount!: number;
    public change_type!: string;
    public change_reason!: string;
    public create_time!: Date;
    public update_time!: Date;
}

UserQuotaHistory.init(UserQuotaHistorySchema, {
    ...Defaultconfig,
    sequelize,
    modelName: 'user_quota_history',
});

export default UserQuotaHistory;
