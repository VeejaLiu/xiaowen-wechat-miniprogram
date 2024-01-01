<template>
    <div class="drawIndex">
        <!-- Top -->
        <div class="top">
            <text :style="{ color: 'rgba(13, 13, 13, 0.80)', fontSize: '28rpx' }">纹身风格</text>
            <div :style="{ marginTop: '0.5rem' }">
                <text :style="{ color: 'rgba(0, 0, 0, 0.6)', fontSize: '28rpx' }">已选： </text>
                <text :style="{ color: 'rgba(0, 0, 0, 0.6)', fontSize: '28rpx' }">
                    {{ tattooStyles.filter((item) => item.index === selectedStyle)[0].name }}
                </text>
            </div>
        </div>
        <!-- Top End -->

        <!-- Styles image selector -->
        <div class="styles-images-div">
            <nut-grid class="styles-grid" :border="false" square :columnNum="4">
                <!-- 利用imageData进行循环 -->
                <nut-grid-item
                    v-for="(item, index) in tattooStyles"
                    :key="index"
                    @click="selectedStyle = item.index"
                    :style="{
                        // border: '0.5px solid rgba(0.9, 0.9, 0.9, 1)',
                        backgroundColor: 'none',
                        '--nut-grid-item-content-padding': '4px',
                    }"
                >
                    <img
                        :class="{ 'styles-image': true, 'styles-image-selected': selectedStyle === item.index }"
                        :src="item.icon"
                        alt="Style Image"
                    />
                </nut-grid-item>
            </nut-grid>
        </div>
        <!-- Styles image selector End -->

        <!-- Prompt Input -->

        <div class="prompt-div">
            <div class="prompt-title">
                <text :style="{ color: 'rgba(13, 13, 13, 0.80)', fontSize: '28rpx' }">纹身描述</text>
            </div>
            <!-- 显示字数 -->
            <div class="prompt-textarea">
                <nut-textarea v-model="prompt" limit-show max-length="50" placeholder="请输入纹身描述" />
            </div>
        </div>

        <!-- Prompt Input End -->

        <!--
        Bottom, including:
        1. Button to go to generate result page
        2. Quota floating
        3. Quota consumption per time
         -->
        <div class="bottom">
            <nut-button class="generate_btn" block @click="draw">
                <p>制作纹身</p>
            </nut-button>
            <div class="quota-consume-tip">
                <span>
                    10
                    <img :style="{ width: '1.8vh', height: '1.8vh' }" :src="CoinImage" alt="Coin Image" />
                    / 次
                </span>
            </div>
            <div class="quota-floating flex-row items-center shrink-0" @click="goToGetQuota">
                <img class="shrink-0 image_6" :src="QuotaCoinImage" alt="Image" />
                <span class="font_1 text_9">{{ user_quota > 99 ? '99+' : user_quota }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, reactive, ref, toRefs } from 'vue';
import './index.scss';
import CoinImage from '../../../assets/images/coin.svg';
import QuotaCoinImage from '../../../assets/images/mdi_ink.svg';
import Taro from '@tarojs/taro';
import { TATTOO_STYLES } from '../../constant/TattooStyle';
import { BACKEND_URL } from '../../constant/Urls';

export default {
    name: 'Index',
    components: {},

    onLunch() {
        console.log('[draw/index] onLunch');
    },

    setup() {
        const prompt = ref('');
        const state = reactive({
            selectedStyle: 1,
            user_quota: 100,
        });

        function getUserInfo() {
            const token = Taro.getStorageSync('token');
            if (!token) {
                console.log('token not exist');
                return;
            }
            Taro.request({
                url: `${BACKEND_URL}/api/v1/user/info`,
                method: 'GET',
                header: { token: token },
                success: async (res) => {
                    console.log('get user info success', res);
                    if (res.statusCode === 401) {
                        console.log('errorCode is 401, Clear all storage');
                        Taro.clearStorageSync();
                        await Taro.redirectTo({
                            url: '/pages/index/index',
                        });
                    }
                    const data = res.data;
                    state.user_quota = data.quota;
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

        onMounted(async () => {
            getUserInfo();
        });

        const draw = async () => {
            try {
                console.log('Start to draw');
                if (prompt.value === '') {
                    Taro.showToast({
                        title: '请填写描述',
                        icon: 'none',
                        duration: 2000,
                    });
                    return;
                }
                console.log('prompt: ', prompt.value);
                console.log('selectedStyle: ', state.selectedStyle);

                const token = Taro.getStorageSync('token');

                const drawRes = await Taro.request({
                    url: `${BACKEND_URL}/api/v1/draw`,
                    method: 'POST',
                    header: {
                        'content-type': 'application/json',
                        token: token,
                    },
                    data: {
                        prompt: prompt.value,
                        style: state.selectedStyle,
                    },
                });

                console.log('drawRes: ', drawRes);

                if (drawRes.statusCode === 200) {
                    const { generateHistoryId } = drawRes.data;
                    console.log('generateHistoryId: ', generateHistoryId);
                    await Taro.navigateTo({
                        url: `/pages/generate_result_detail/index?generateHistoryId=${generateHistoryId}`,
                    });
                } else {
                    if (drawRes.data.message === "user's quota is not enough") {
                        await Taro.showToast({
                            title: '对不起，您的配额不足',
                            icon: 'none',
                            duration: 3000,
                        });
                        return;
                    }
                    await Taro.showToast({
                        title: '制作失败',
                        icon: 'none',
                        duration: 2000,
                    });
                }
            } catch (e) {
                console.log('e: ', e);
                await Taro.showToast({
                    title: '制作失败',
                    icon: 'none',
                    duration: 2000,
                });
            }
        };

        const goToGetQuota = () => {
            console.log('go to get_quota');
            Taro.navigateTo({
                url: '/pages/get_quota/index',
            });
        };

        return {
            prompt,
            draw,
            goToGetQuota,
            CoinImage,
            QuotaCoinImage,
            ...toRefs(state),
            tattooStyles: TATTOO_STYLES,
        };
    },
};
</script>
