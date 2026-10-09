import Sequelize, { Model, ModelAttributes } from 'sequelize';
import { sequelize, Defaultconfig } from '../db-config';

/*
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` varchar(36) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL COMMENT '用户昵称',
  `avatar_url` varchar(500) DEFAULT NULL COMMENT '用户头像地址',
  `appid` varchar(255) NOT NULL DEFAULT '' COMMENT '小程序appid',
  `openid` varchar(255) NOT NULL DEFAULT '' COMMENT '小程序openid',
  `unionid` varchar(255) NOT NULL DEFAULT '' COMMENT '小程序unionid',
  `session_key` varchar(255) NOT NULL DEFAULT '' COMMENT '小程序session_key',
  `access_token` varchar(255) NOT NULL DEFAULT '' COMMENT '小程序access_token',
  `phone_code` varchar(20) DEFAULT NULL COMMENT '手机区号',
  `phone_number` varchar(20) DEFAULT NULL COMMENT '手机号码',
  `invite_code` varchar(4) DEFAULT NULL COMMENT '邀请码，该用户的邀请码',
  `invited_by_user_id` varchar(36) DEFAULT NULL COMMENT '邀请该用户的用户user_id',
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
    phone_code: {
        type: Sequelize.STRING(20),
    },
    phone_number: {
        type: Sequelize.STRING(20),
    },
    invite_code: {
        type: Sequelize.STRING(4),
    },
    invited_by_user_id: {
        type: Sequelize.STRING(36),
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
    public phone_code!: string;
    public phone_number!: string;
    public invite_code!: string;
    public invited_by_user_id!: string;
    public create_time!: Date;
    public update_time!: Date;

    /**
     * [raw format]
     * 获取用户信息, 通过user_id
     */
    public static async getRawByUserId(userId: string) {
        return await User.findOne({ where: { user_id: userId }, raw: true });
    }

    /**
     * 更改手机信息
     */
    public static async updatePhoneInfo({
        userId,
        phoneCode,
        phoneNumber,
    }: {
        userId: string;
        phoneCode: string;
        phoneNumber: string;
    }) {
        return await User.update({ phone_code: phoneCode, phone_number: phoneNumber }, { where: { user_id: userId } });
    }

    /**
     * 获取open id
     */
    public static async getOpenId({ userId }: { userId: string }) {
        const user = await User.findOne({ where: { user_id: userId } });
        return user.openid;
    }

    /**
     * 根据invite code获取用户信息
     */
    public static async getByInviteCode(inviteCode: string) {
        return await User.findOne({ where: { invite_code: inviteCode }, raw: true });
    }
}

User.init(UserSchema, {
    ...Defaultconfig,
    sequelize,
    modelName: 'user',
});

export default User;
