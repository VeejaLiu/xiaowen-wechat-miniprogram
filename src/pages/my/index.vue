<template>
    <!-- User info Start -->
    <div class="flex-row items-center section_3 space-x-20">
        <div class="flex-row items-center flex-auto" @click="goToUserSetting">
            <div class="shrink-0 section_4"></div>
            <span class="font_1 text_3">
                {{ userInfo.nickName }}
            </span>
            <img class="shrink-0 image_6" :src="userInfo.avatarUrl" />
        </div>
        <div class="flex-row items-center shrink-0 section_5 space-x-4" @click="goToGetQuota()">
            <img
                class="shrink-0 image_5"
                src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/654c561c5a7e3f03102666c0/654f17d1f9a7df001222bfcc/16996823099847673226.png"
            />
            <span class="font_1 text_4">
                {{ userInfo.quota }}
            </span>
        </div>
    </div>
    <!-- User info End -->

    <!-- History Title Start -->
    <div class="flex-col items-start group_6 space-y-8">
        <span class="font_2">生成历史</span>
        <div class="section_6"></div>
    </div>
    <!-- History Title End -->

    <!-- History -->
    <div class="flex-col list">
        <div
            class="flex-col list-item space-y-16"
            v-for="(history, index) in historyData"
            :key="index"
            @click="goToGeneResPage(history.generateHistoryId)"
        >
            <div class="flex-row justify-between items-center group_8">
                <span class="font_3 text_5">
                    {{ TATTOO_STYLES[history.style]?.name }}
                </span>
                <div class="flex-row items-center space-x-2">
                    <span class="font_2">查看 ></span>
                </div>
            </div>

            <div class="flex-col space-y-18">
                <span class="font_4 text_6">
                    {{ history.description }}
                </span>
            </div>
            <nut-grid
                class="history-item-images"
                :border="false"
                :column-num="4"
                square
                :style="{
                    'background-color': 'none',
                }"
            >
                <!-- 利用imageData进行循环 -->
                <nut-grid-item
                    v-for="(image, index) in history.images"
                    :key="index"
                    :style="{
                        '--nut-grid-item-content-padding': '2px',
                        '--nut-grid-item-content-bg-color': 'none',
                    }"
                >
                    <img class="history-item-images-image" :src="image" />
                </nut-grid-item>
            </nut-grid>
        </div>
    </div>
    <!-- History End -->
</template>

<script lang="js">
import Taro from '@tarojs/taro';
import './index.scss';
import { onMounted, ref } from 'vue';
import { TATTOO_STYLES } from '../../constant/TattooStyle';

export default {
    name: 'Index',
    components: {},

    setup() {
        const historyData = ref([]);
        const userInfo = ref({
            avatarUrl: '',
            nickName: '获取中',
            quota: 0,
        });

        const images = [
            'http://123.60.97.192:9001/pic/blank.png',
            'http://123.60.97.192:9001/pic/blank.png',
            'http://123.60.97.192:9001/pic/blank.png',
            'http://123.60.97.192:9001/pic/blank.png',
        ];

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

        async function getAllGenerateHistory() {
            const token = Taro.getStorageSync('token');
            const res = await Taro.request({
                url: `http://localhost:10100/api/v1/history`,
                method: 'GET',
                header: {
                    token: token,
                },
                success: (res) => {
                    console.log('get all generate history success', res);
                    const { data, total } = res.data;
                    historyData.value = data.map((item) => {
                        // createTime: "2023-11-27T09:04:01.000Z"
                        // generateUsedTime: 0
                        // id: 144
                        // images: []
                        // prompt: "adsdadsad"
                        // status: 2
                        // style: 0
                        // userId: "14634b3a-3c93-4b69-aefd-92fee9fe52a2"
                        if (item.images.length === 0) {
                            item.images = images;
                        }
                        return {
                            generateHistoryId: item.id,
                            style: item.style,
                            description: item.prompt,
                            images: item.images,
                        };
                    });
                },
                fail: (err) => {
                    console.log('get all generate history fail', err);
                    Taro.showToast({
                        title: '很抱歉，获取生成历史失败',
                        icon: 'none',
                    });
                },
            });
        }

        onMounted(async () => {
            getUserInfo();
            getAllGenerateHistory();
        });

        const goToGetQuota = () => {
            console.log('go to get_quota');
            Taro.navigateTo({
                url: '/pages/get_quota/index',
            });
        };

        const goToGeneResPage = (generateHistoryId) => {
            console.log('go to generate_result_detail');
            Taro.navigateTo({
                url: `/pages/generate_result_detail/index?generateHistoryId=${generateHistoryId}`,
            });
        };

        const goToUserSetting = () => {
            console.log('go to user_setting');
            Taro.navigateTo({
                url: '/pages/user_setting/index',
            });
        };

        return {
            goToGetQuota,
            goToGeneResPage,
            goToUserSetting,
            historyData,
            userInfo,
            TATTOO_STYLES,
        };
    },
};
</script>
