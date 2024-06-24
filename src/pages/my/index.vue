<template>
    <!-- User info Start -->
    <div class="flex-row items-center section_3 space-x-20" @click="goToUserSetting">
        <div class="flex-row items-center flex-auto">
            <div class="shrink-0 section_4"></div>
            <span class="font_1 text_3">
                {{ userInfo.nickName }}
            </span>
            <img class="shrink-0 image_6" :src="userInfo.avatarUrl" />
        </div>
        <div class="flex-row items-center shrink-0 section_5 space-x-4">
            <img class="shrink-0 image_5" :src="SettingIcon" />
        </div>
    </div>
    <!-- User info End -->

    <!-- History Title Start -->
    <div class="flex-col items-start group_6 space-y-8">
        <span class="font_title">生成历史</span>
        <div class="section_6"></div>
    </div>
    <!-- History Title End -->

    <!-- History -->
    <scroll-view scroll-y="true" class="flex-col list" :enable-flex="true" @scrolltolower="lowerFunc">
        <div
            class="flex-col list-item space-y-16"
            v-for="(history, index) in historyData"
            :key="index"
            @click="goToGeneResPage(history.generateHistoryId)"
        >
            <div class="flex-row justify-between items-center group_8">
                <span class="font_3 text_5">
                    {{ TATTOO_STYLES.find((item) => Number(item.index) === Number(history.style))?.name }}
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
                    <img class="history-item-images-image" :src="image.thumbnail" />
                </nut-grid-item>
            </nut-grid>
        </div>
    </scroll-view>
    <!-- History End -->
</template>

<script lang="js">
import Taro from '@tarojs/taro';
import './index.scss';
import { onMounted, ref } from 'vue';
import { TATTOO_STYLES } from '../../constant/TattooStyle';
import { BACKEND_URL, SOURCE_PATH } from '../../constant/Urls';
const SettingIcon = SOURCE_PATH + "/images/base_icon/setting.svg";
const BLANK_IMG = SOURCE_PATH + '/images/loading.png';
const PAGE_NUM = 10; // 每页数量

export default {
    name: 'Index',
    components: {},

    setup() {
        const historyData = ref([]);
        const userInfo = ref({
            avatarUrl: '',
            nickName: 'wx_xxxx',
            quota: 0,
        });

        const images = [
            {
                original: BLANK_IMG,
                thumbnail: BLANK_IMG,
            },
            {
                original: BLANK_IMG,
                thumbnail: BLANK_IMG,
            },
            {
                original: BLANK_IMG,
                thumbnail: BLANK_IMG,
            },
            {
                original: BLANK_IMG,
                thumbnail: BLANK_IMG,
            }
        ];

        async function getUserInfo() {
            const token = Taro.getStorageSync('token');
            await Taro.request({
                url: `${BACKEND_URL}/api/v1/user/info`,
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
                    Taro.setStorageSync('nickname', data.nickname);
                    Taro.setStorageSync('user_quota', data.quota);
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
        /**
         * 获取生成历史
         */
        async function getGenerateHistory(start, limit = PAGE_NUM) {
            return new Promise((resolve, reject)=>{
                const token = Taro.getStorageSync('token');
                Taro.showLoading({
                    title: '数据获取'
                });
                Taro.request({
                    url: `${BACKEND_URL}/api/v1/history?start=${start}&limit=${limit}`,
                    method: 'GET',
                    header: {
                        token: token,
                    },
                    success: (res) => {
                        console.log('get all generate history success', res);
                        resolve(res.data);
                    },
                    fail: (err) => {
                        reject(err);
                        console.log('get all generate history fail', err);
                        Taro.showToast({
                            title: '很抱歉，获取生成历史失败',
                            icon: 'none',
                        });
                    },
                    complete: ()=>{
                        Taro.hideLoading();
                    }
                });
            });
        }
        /**
         * 获取下一页数据
         */
        async function getNextPageGenerateHistory() {
            const res = await getGenerateHistory(historyData.value.length).catch(err=>{
                console.log('get generate history fail', err);
                Taro.showToast({
                    title: '很抱歉，获取生成历史失败',
                    icon: 'none',
                });
            });
            const { data, total } = res;
            if(!data.length) {
                Taro.showToast({
                    title: '数据到底了',
                    icon: 'none',
                });
                return;
            }
            const formatData = data.map((item) => {
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
            historyData.value.push(...formatData);
        }

        onMounted(async () => {
            const cacheNickname = Taro.getStorageSync('nickname');
            const cacheUserQuota = Taro.getStorageSync('user_quota');
            if (cacheNickname) {
                userInfo.value.nickName = cacheNickname;
            }
            if (cacheUserQuota) {
                userInfo.value.quota = cacheUserQuota;
            }
            getUserInfo();
            getNextPageGenerateHistory();
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

        // 滚动至底部触发
        const lowerFunc = ()=>{
            getNextPageGenerateHistory();
        }

        return {
            goToGetQuota,
            goToGeneResPage,
            goToUserSetting,
            historyData,
            userInfo,
            TATTOO_STYLES,
            SettingIcon,
            lowerFunc
        };
    },
};
</script>
