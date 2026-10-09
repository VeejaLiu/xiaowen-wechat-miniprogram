export const USER_QUOTA_HISTORY = {
    STATUS: {
        ONGOING: 0, // 生成中
        SUCCESS: 1, // 生成成功
        FAILED: 2, // 生成失败
    },
    CHANGE_TYPE: {
        ADD: 1, // 增加
        SUBTRACT: 2, // 减少
    },

    CHANGE_REASON: {
        ADD: {
            REGISTER: 0, // 初始注册赠予
            WATCH_AD: 1, // 观看广告
            RECHARGE: 2, // 购买
            INVITE_REGISTER: 3, // 邀请注册
        },
        SUBTRACT: {
            GENERATE: 1, // 普通生成
        },
    },
};
