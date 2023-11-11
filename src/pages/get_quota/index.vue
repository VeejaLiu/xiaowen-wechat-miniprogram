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
                <span class="self-start font_3">100</span>
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
            <div class="flex-row justify-between items-center group_9 view_2" v-for="item in 10">
                <span class="font_4">成功邀请好友</span>
                <span class="font_5">+25</span>
            </div>
        </div>
        <!-- 积分记录 End -->
    </div>
</template>

<script>
import Taro from '@tarojs/taro';
import './index.css';

export default {
    name: 'Index',
    components: {},
    setup() {
        const goToGenerate = () => {
            Taro.navigateTo({
                url: '/pages/index/index',
            });
        };
        return {
            goToGenerate,
        };
    },
};
</script>
