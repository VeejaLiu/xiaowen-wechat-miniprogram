import Sequelize, { Model, ModelAttributes } from 'sequelize';
import { sequelize, Defaultconfig } from '../db-config';

/*
CREATE TABLE `user_feedback` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` varchar(36) DEFAULT NULL COMMENT '用户id',
  `rate` int NOT NULL DEFAULT '0' COMMENT '评分',
  `content` text NOT NULL COMMENT '反馈内容',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
 */
const UserFeedbackSchema: ModelAttributes = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: Sequelize.STRING(36),
    },
    rate: {
        type: Sequelize.INTEGER,
    },
    content: {
        type: Sequelize.TEXT,
    },
    create_time: {
        type: Sequelize.DATE,
    },
    update_time: {
        type: Sequelize.DATE,
    },
};

class UserFeedback extends Model {
    public id!: number;
    public user_id!: string;
    public rate!: number;
    public content!: string;
    public create_time!: Date;
    public update_time!: Date;
}

UserFeedback.init(UserFeedbackSchema, {
    ...Defaultconfig,
    sequelize,
    modelName: 'user_feedback',
});

export default UserFeedback;
