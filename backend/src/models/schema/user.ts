import Sequelize, { Model, ModelAttributes } from 'sequelize';
import { sequelize, Defaultconfig } from '../db-config';

/*
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` varchar(36) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL COMMENT '用户昵称',
  `avatar_url` varchar(500) DEFAULT NULL COMMENT '用户头像地址',
  `appid` varchar(255) NOT NULL DEFAULT '',
  `openid` varchar(255) NOT NULL DEFAULT '',
  `unionid` varchar(255) NOT NULL DEFAULT '',
  `session_key` varchar(255) NOT NULL DEFAULT '',
  `access_token` varchar(255) NOT NULL DEFAULT '',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
 */
const UserSchema: ModelAttributes = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: Sequelize.STRING(36),
    },
    nickname: {
        type: Sequelize.STRING(255),
    },
    avatar_url: {
        type: Sequelize.STRING(500),
    },
    appid: {
        type: Sequelize.STRING(255),
    },
    openid: {
        type: Sequelize.STRING(255),
    },
    unionid: {
        type: Sequelize.STRING(255),
    },
    session_key: {
        type: Sequelize.STRING(255),
    },
    access_token: {
        type: Sequelize.STRING(255),
    },
    create_time: {
        type: Sequelize.DATE,
    },
    update_time: {
        type: Sequelize.DATE,
    },
};

class User extends Model {
    public id!: number;
    public user_id!: string;
    public nickname!: string;
    public avatar_url!: string;
    public appid!: string;
    public openid!: string;
    public unionid!: string;
    public session_key!: string;
    public access_token!: string;
    public create_time!: Date;
    public update_time!: Date;
}

User.init(UserSchema, {
    ...Defaultconfig,
    sequelize,
    modelName: 'user',
});

export default User;
