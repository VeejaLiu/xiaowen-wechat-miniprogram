import Sequelize, { Model, ModelAttributes } from 'sequelize';
import { sequelize, Defaultconfig } from '../db-config';

/*
CREATE TABLE `user_generate_history` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` varchar(36) DEFAULT NULL COMMENT '用户id',
  `style` int NOT NULL DEFAULT '0' COMMENT '风格',
  `prompt_history_id` bigint NOT NULL COMMENT 'prompt_history表的id',
  `status` int DEFAULT '0' COMMENT '生成状态',
  `notification` int NOT NULL DEFAULT '0',
  `generate_used_time` int NOT NULL DEFAULT '0' COMMENT '生成所用时间,单位毫秒',
  `images` text NOT NULL COMMENT '生成的图片objectName, 是个string数组Json',
  `is_private` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否私有',
  `is_starred` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否收藏',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否删除',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
 */
const UserGenerateHistorySchema: ModelAttributes = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: Sequelize.STRING(36),
    },
    style: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    prompt_history_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    notification: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    generate_used_time: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    images: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    is_private: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0,
    },
    is_starred: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0,
    },
    is_deleted: {
        type: Sequelize.TINYINT,
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

class UserGenerateHistory extends Model {
    public id!: number;
    public user_id!: string | null;
    public style!: number;
    public prompt_history_id!: bigint;
    public status!: number;
    public notification!: number;
    public generate_used_time!: number;
    public images!: string;
    public is_private!: boolean;
    public is_starred!: boolean;
    public is_deleted!: boolean;
    public create_time!: Date;
    public update_time!: Date;
}

UserGenerateHistory.init(UserGenerateHistorySchema, {
    ...Defaultconfig,
    sequelize,
    modelName: 'user_generate_history',
});

export default UserGenerateHistory;
