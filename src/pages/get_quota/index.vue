<template>
    <div class="flex-col page">
        <!-- 积分余额 Start -->
        <div class="flex-col relative section_quota">
            <div class="flex-row items-center space-x-6">
                <img
                    class="image_8"
                    src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/654c561c5a7e3f03102666c0/654f17d1f9a7df001222bfcc/16996823098311387882.png"
                />
                <span class="font_2">积分余额</span>
            </div>
            <div class="flex-row items-baseline group_7">
                <span class="self-start font_3">
                    {{ userInfo.quota }}
                </span>
            </div>
            <div class="flex-row items-baseline group_7 gary-text">
                <span class="self-start font_2">0.99元 / 10积分</span>
            </div>
            <div class="flex-col justify-start items-center text-wrapper_2 button">
                <span class="font_2 text_5">去充值</span>
            </div>
        </div>
        <!-- 积分余额 End -->

        <!-- 赚取积分 Title Start -->
        <div class="flex-row justify-center items-center space-x-4 get-quota-title">
            <div class="section_5"></div>
            <span class="font_1 text_3">赚取积分</span>
            <div class="section_5"></div>
        </div>
        <!-- 赚取积分 Title End -->

        <!-- 邀请好友 Start -->
        <div class="flex-col relative section_6">
            <div class="flex-row items-center space-x-6">
                <img
                    class="image_8"
                    src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/654c561c5a7e3f03102666c0/654f17d1f9a7df001222bfcc/16996823098311387882.png"
                />
                <span class="font_2">每成功邀请一名好友注册</span>
            </div>
            <div class="flex-row items-baseline group_7">
                <span class="self-start font_3">+100</span>
            </div>
            <div class="flex-col justify-start items-center text-wrapper_2 button">
                <span class="font_2 text_5">去邀请</span>
            </div>
        </div>
        <!-- 邀请好友 End -->

        <!-- 观看视频 Start -->
        <div class="flex-col relative section_6">
            <div class="flex-row items-center space-x-6">
                <img
                    class="image_8"
                    src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/654c561c5a7e3f03102666c0/654f17d1f9a7df001222bfcc/16996823098311387882.png"
                />
                <span class="font_2">观看视频（1/20 每日）</span>
            </div>
            <div class="flex-row items-baseline group_7">
                <span class="font_3">+8</span>
                <span class="font_1 text_6">/次</span>
            </div>
            <div class="flex-col justify-start items-center text-wrapper_2 button">
                <span class="font_2 text_5">观看</span>
            </div>
        </div>
        <!-- 观看视频 End -->

        <!-- 积分记录 title Start -->
        <div class="flex-row justify-center items-center space-x-4 get-quota-title">
            <div class="section_5"></div>
            <span class="font_1 text_3">积分记录</span>
            <div class="section_5"></div>
        </div>
        <!-- 积分记录 Title End -->

        <!-- 积分记录 Start -->
        <div class="flex-col section_7">
            <div class="flex-row justify-between items-center group_9 view_2" v-for="item in quotaHistory">
                <span class="font_4">
                    <!-- 原因 -->
                    {{ item.reason }}
                </span>
                <span class="font_5">
                    <!-- 额度增减 -->
                    {{ item.amount }}
                </span>
            </div>
        </div>
        <!-- 积分记录 End -->
    </div>
</template>

<script>
import Taro from '@tarojs/taro';
import './index.css';
import { onMounted, ref } from 'vue';

const QUOTA_CONSTANT = {
    CHANGE_TYPE: {
        ADD: 1, // 增加
        SUBTRACT: 2, // 减少
    },
    CHANGE_REASON: {
        ADD: {
            0: '初始注册赠予',
            1: '观看广告',
            2: '购买',
            3: '邀请注册',
            4: '生成失败退还',
        },
        SUBTRACT: {
            1: '普通生成',
        },
    },
};

export default {
    name: 'Index',
    components: {},
    setup() {
        const userInfo = ref({
            avatarUrl: '',
            nickName: '',
            quota: 0,
        });

        const quotaHistory = ref([]);

        async function getUserInfo() {
            const token = Taro.getStorageSync('token');
            await Taro.request({
                url: `http://localhost:10100/api/v1/user/info`,
                method: 'GET',
                header: { token: token },
                success: (res) => {
                    console.log('get user info success', res);
                    // userId: user.user_id,
                    // nickname: user.nickname,
                    // avatarUrl: user.avatar_url,
                    // createTime: user.create_time,
                    // quota: userQuota.quota,
                    const data = res.data;
                    userInfo.value = {
                        avatarUrl: data.avatarUrl,
                        nickName: data.nickname,
                        quota: data.quota,
                    };
                },
                fail: (err) => {
                    console.log('get user info fail', err);
                    Taro.showToast({
                        title: '很抱歉，获取用户信息失败',
                        icon: 'none',
                    });
                },
            });
        }

        async function getQuotaHistory() {
            const token = Taro.getStorageSync('token');
            await Taro.request({
                url: `http://localhost:10100/api/v1/quota/history`,
                method: 'GET',
                header: { token: token },
                success: (res) => {
                    console.log('get quota history success', res);
                    // {id: 15, changeType: 1, amount: 10, reason: 4}
                    // {id: 14, changeType: 2, amount: 10, reason: 1}
                    const quotaHistoryRes = res.data;

                    const result = [];
                    for (let item of quotaHistoryRes) {
                        console.log('item', item);
                        const amountString =
                            item.changeType === QUOTA_CONSTANT.CHANGE_TYPE.ADD ? `+${item.amount}` : `-${item.amount}`;
                        const reasonString =
                            item.changeType === QUOTA_CONSTANT.CHANGE_TYPE.ADD
                                ? QUOTA_CONSTANT.CHANGE_REASON.ADD[`${item.reason}`]
                                : QUOTA_CONSTANT.CHANGE_REASON.SUBTRACT[`${item.reason}`];
                        result.push({
                            id: item.id,
                            amount: amountString,
                            reason: reasonString,
                        });
                    }
                    quotaHistory.value = result;
                },
                fail: (err) => {
                    console.log('get quota history fail', err);
                    Taro.showToast({
                        title: '很抱歉，获取配额历史数据失败',
                        icon: 'none',
                    });
                },
            });
        }

        onMounted(async () => {
            getUserInfo();
            getQuotaHistory();
        });
        return {
            userInfo,
            quotaHistory,
        };
    },
};
</script>
