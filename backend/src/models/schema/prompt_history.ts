import Sequelize, { Model, ModelAttributes } from 'sequelize';
import { sequelize, Defaultconfig } from '../db-config';

/*
CREATE TABLE `prompt_history` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `prompt` text NOT NULL COMMENT '生成的文案',
  `prompt_english` text NOT NULL COMMENT '生成的文案英文',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
 */
const PromptHistorySchema: ModelAttributes = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    prompt: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    prompt_english: {
        type: Sequelize.TEXT,
        allowNull: false,
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

class PromptHistory extends Model {
    public id!: number;
    public prompt!: string;
    public prompt_english!: string;
    public create_time!: Date;
    public update_time!: Date;
}

PromptHistory.init(PromptHistorySchema, {
    ...Defaultconfig,
    sequelize,
    modelName: 'prompt_history',
});

export default PromptHistory;
