<template>
    <view class="generate-result-detail">
        <!-- Top -->
        <div class="flex-row group_4">
            <span class="font_2 text_3">风格：</span>
            <span class="font_2 text_4">
                {{ TATTOO_STYLES.find((item) => item.index === Number(styleText))?.name }}
            </span>
        </div>

        <div class="flex-row group_5">
            <span class="font_2 text_3">描述：</span>
            <span class="font_2 text_4">
                {{ promptText }}
            </span>
        </div>
        <!-- Top End -->

        <div class="img-area">
            <img class="image-show" mode="aspectFit" :src="imageData[chooseImage].original" />
            <div class="img-area-op">
                <!--                <img v-if="!isProcessing" class="img-area-share" :src="ShareIcon" @click="doShareImage" />-->
                <!--                <img v-if="!isProcessing" class="img-area-download" :src="DownloadIcon" />-->
            </div>
        </div>
        <nut-grid class="image-chose" :border="false" square>
            <!-- 利用imageData进行循环 -->
            <nut-grid-item
                v-for="(image, index) in imageData"
                :key="image.thumbnail"
                @click="chooseImage = index"
                :style="{
                    '--nut-grid-item-content-padding': '5px',
                }"
            >
                <!-- :class="{ 'grid-item': true, selected: selectedStyle === index }"-->
                <img
                    :class="{ 'image-show': true, 'image-item-active': chooseImage === index }"
                    :src="image.thumbnail"
                />
            </nut-grid-item>
        </nut-grid>

        <div class="btn-area" v-if="isProcessing">
            <nut-button class="btn" color="black" disabled>生成中...</nut-button>
            <nut-button
                class="btn"
                :style="{
                    '--nut-button-border-width': '0px',
                }"
                type="default"
                @click="requestSubscribeMessage"
            >
                生成好了通知我
            </nut-button>
        </div>

        <div class="btn-area" v-if="!isProcessing">
            <nut-button class="btn" color="black" @click="goToGenerate">新的制作</nut-button>
            <div class="ai-generate-tips">
                <p>内容由AI生成</p>
                <img :src="AiTipIcon" @click="showPopup = true" />
            </div>
        </div>

        <nut-popup
            id="homepage_popup"
            position="bottom"
            closeable
            round
            :style="{ height: '30%' }"
            :overlay="false"
            :safe-area-inset-bottom="true"
            :destroy-on-close="false"
            v-model:visible="showPopup"
        >
            <div class="flex-row justify-center items-center relative group_10">
                <span class="font_1 text_2 text_7">AI 生成内容特别声明</span>
            </div>
            <span class="mt-34 text_8">
                特别声明:
                本平台所有生成内容均为人工智能生成，不代表本平台的观点和立场，且本平台对其生成内容的真实性、合法性、准确性等不做任何保证，也不承担任何责任。
                <br />
            </span>
        </nut-popup>
    </view>
</template>

<script>
import { onMounted, ref } from 'vue';
import Taro, { chooseImage } from '@tarojs/taro';
import './index.scss';

import { TATTOO_STYLES } from '../../constant/TattooStyle';
import { BACKEND_URL, SOURCE_PATH } from '../../constant/Urls';
const ShareIcon = SOURCE_PATH + '/images/gen_res_icon/share.png';
const DownloadIcon = SOURCE_PATH + '/images/gen_res_icon/download.png';
const AiTipIcon = SOURCE_PATH + '/images/gen_res_icon/ai_generated_tip.png';
const BLANK_IMG = SOURCE_PATH + '/images/loading.png';

export default {
    name: 'Index',
    methods: { chooseImage },
    components: {},
    setup() {
        const showPopup = ref(false);

        const goToMy = () => {
            Taro.navigateTo({
                url: '/pages/my/index',
            });
        };
        const handleClick = () => {};

        const chooseImage = ref(0);
        const imageData = ref([
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
            },
        ]);
        const isProcessing = ref(true);
        const styleText = ref('');
        const promptText = ref('');
        const currentGenerateHistoryId = ref(0);

        const setStyleAndPrompt = async (generateHistoryId) => {
            currentGenerateHistoryId.value = generateHistoryId;
            if (currentGenerateHistoryId.value === 0) {
                return;
            }
            await Taro.request({
                header: {
                    'content-type': 'application/json',
                    token: await Taro.getStorageSync('token'),
                },
                url: `${BACKEND_URL}/api/v1/history/${currentGenerateHistoryId.value}`,
                method: 'GET',
                success: async (res) => {
                    console.log(res);
                    const { style, prompt, status, images } = res.data;
                    styleText.value = style;
                    promptText.value = prompt;
                    if (images?.length > 0) {
                        imageData.value = images;
                    }
                    // 生成中
                    switch (status) {
                        case 0:
                            // 生成中
                            isProcessing.value = true;
                            // 5s后重新获取
                            setTimeout(() => {
                                setStyleAndPrompt(generateHistoryId);
                            }, 5000);
                            break;
                        case 1:
                            // 生成成功
                            isProcessing.value = false;
                            break;
                        case 2:
                        default:
                            // 生成失败
                            isProcessing.value = false;
                            Taro.showToast({
                                title: '抱歉，本次生成失败',
                                icon: 'none',
                                duration: 2000,
                            });
                            break;
                    }
                },
                fail: (err) => {
                    Taro.showToast({
                        title: '获取历史记录失败',
                        icon: 'none',
                        duration: 2000,
                    });
                },
            });
        };

        onMounted(async () => {
            // 在页面加载完成后获取路由参数
            const { generateHistoryId } = Taro.getCurrentInstance().router.params;
            // 在这里进行相应的操作，例如更新视图或发送网络请求
            console.log(`[generate_result_detail/index][onMounted()] generateHistoryId: ${generateHistoryId}`);

            // set style and prompt text and generateHistoryId
            await setStyleAndPrompt(generateHistoryId);
        });

        const goToGenerate = () => {
            Taro.redirectTo({
                url: '/pages/index/index',
            });
        };

        const requestSubscribeMessage = async () => {
            const res = await Taro.requestSubscribeMessage({
                tmplIds: ['tOTzytOQzSoqLB0z7UnEp2GNFZQi4tkPdDJ0yoxxaXs'],
            });
            console.log(res);
            const { errMsg } = res;
            if (errMsg === 'requestSubscribeMessage:ok') {
                await Taro.request({
                    header: {
                        'content-type': 'application/json',
                        token: await Taro.getStorageSync('token'),
                    },
                    url: `${BACKEND_URL}/api/v1/notification/subscribe`,
                    method: 'POST',
                    data: {
                        generateHistoryId: currentGenerateHistoryId.value,
                    },
                    success: async (res) => {
                        console.log(res);
                        const { success } = res.data;
                        if (success) {
                            Taro.showToast({
                                title: '订阅成功',
                                icon: 'success',
                                duration: 2000,
                            });
                        } else {
                            Taro.showToast({
                                title: '订阅失败',
                                icon: 'none',
                                duration: 2000,
                            });
                        }
                    },
                    fail: (err) => {
                        Taro.showToast({
                            title: '订阅失败',
                            icon: 'none',
                            duration: 2000,
                        });
                    },
                });
                Taro.showToast({
                    title: '订阅成功',
                    icon: 'success',
                    duration: 2000,
                });
            } else {
                Taro.showToast({
                    title: '订阅失败',
                    icon: 'none',
                    duration: 2000,
                });
            }
        };

        const doShareImage = async () => {
            console.log('doShareImage');
            Taro.downloadFile({
                url: 'http://123.60.97.192:9001/pic/2023-11-07T17:04:13.829028_1.png',
                success: (res) => {
                    Taro.showShareImageMenu({
                        path: res.tempFilePath,
                        needShowEntrance: true,
                        style: 'v2',
                    });
                },
            });
        };

        return {
            styleText,
            promptText,
            currentGenerateHistoryId,
            isProcessing,
            chooseImage,
            imageData,
            showPopup,
            handleClick,
            goToGenerate,
            goToMy,
            requestSubscribeMessage,
            doShareImage,
            ShareIcon,
            DownloadIcon,
            AiTipIcon,
            TATTOO_STYLES,
        };
    },
};
</script>
