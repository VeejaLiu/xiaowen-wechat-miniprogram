<template>
    <view class="generate-result-detail">
        <!-- Top -->
        <div class="flex-row group_4">
            <span class="font_2 text_3">风格：</span>
            <span class="font_2 text_4">
                {{ tattooStyles[styleText]?.name }}
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
            <img class="image-show" :src="imageData[chooseImage]" />
            <div class="img-area-op">
                <img v-if="!isProcessing" class="img-area-share" :src="ShareIcon" />
                <img v-if="!isProcessing" class="img-area-download" :src="DownloadIcon" />
            </div>
        </div>
        <nut-grid class="image-chose" :border="false" square>
            <!-- 利用imageData进行循环 -->
            <nut-grid-item
                v-for="(image, index) in imageData"
                :key="index"
                @click="chooseImage = index"
                :style="{
                    '--nut-grid-item-content-padding': '5px',
                }"
            >
                <!-- :class="{ 'grid-item': true, selected: selectedStyle === index }"-->
                <img :class="{ 'image-show': true, 'image-item-active': chooseImage === index }" :src="image" />
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
                @click=""
                >生成好了通知我</nut-button
            >
        </div>

        <div class="btn-area" v-if="!isProcessing">
            <nut-button class="btn" color="black">新的制作</nut-button>
            <p>内容由AI生成</p>
        </div>
    </view>
</template>

<script>
import { onMounted, ref } from 'vue';
import Taro, { chooseImage } from '@tarojs/taro';
import './index.scss';
import ShareIcon from '../../../assets/images/gen_res_icon/share.png';
import DownloadIcon from '../../../assets/images/gen_res_icon/download.png';
import { tattooStyles } from '../../constant/TattooStyle';

export default {
    name: 'Index',
    methods: { chooseImage },
    components: {},
    setup() {
        const goToMy = () => {
            Taro.navigateTo({
                url: '/pages/my/index',
            });
        };
        const handleClick = () => {};

        const chooseImage = ref(0);
        const imageData = ref([]);
        const isProcessing = ref(true);
        const styleText = ref('');
        const promptText = ref('');
        const currentGenerateHistoryId = ref(6);

        const setStyleAndPrompt = async (generateHistoryId) => {
            currentGenerateHistoryId.value = generateHistoryId;
            await Taro.request({
                header: {
                    'content-type': 'application/json',
                    token: await Taro.getStorageSync('token'),
                },
                url: `http://localhost:10100/api/v1/history/${currentGenerateHistoryId.value}`,
                method: 'GET',
                success: async (res) => {
                    console.log(res);
                    const { style, prompt, status, images } = res.data;
                    styleText.value = style;
                    promptText.value = prompt;
                    imageData.value = images;
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
            await setStyleAndPrompt(6);
        });

        const goToGenerate = () => {
            Taro.navigateTo({
                url: '/pages/index/index',
            });
        };
        return {
            styleText,
            promptText,
            currentGenerateHistoryId,
            isProcessing,
            chooseImage,
            imageData,
            handleClick,
            goToGenerate,
            goToMy,
            ShareIcon,
            DownloadIcon,
            tattooStyles,
        };
    },
};
</script>
