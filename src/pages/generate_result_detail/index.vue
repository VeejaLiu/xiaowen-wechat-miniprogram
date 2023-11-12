<template>
    <view class="generate-result-detail">
        <!-- Top -->
        <div class="flex-row group_4">
            <span class="font_2 text_3">风格：</span>
            <span class="font_2 text_4">点刺（dotwork）</span>
        </div>

        <div class="flex-row group_5">
            <span class="font_2 text_3">描述：</span>
            <span class="font_2 text_4">带刺的玫瑰</span>
        </div>
        <!-- Top End -->

        <div class="img-area">
            <img class="image-show" :src="imageData[chooseImage]" />
            <div class="img-area-op">
                <img class="img-area-share" :src="ShareIcon" />
                <img class="img-area-download" :src="DownloadIcon" />
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
import { ref } from 'vue';
import Taro, { chooseImage } from '@tarojs/taro';
import './index.scss';
import ShareIcon from '../../../assets/images/share.png';
import DownloadIcon from '../../../assets/images/download.png';

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
        const imageData = ref([
            'http://123.60.97.192:9001/pic/2023-11-08T22:40:13.929681_1.png',
            'http://123.60.97.192:9001/pic/2023-11-08T22:40:13.929681_2.png',
            'http://123.60.97.192:9001/pic/2023-11-08T22:32:21.972631_1.png',
            'http://123.60.97.192:9001/pic/2023-11-08T22:32:21.972631_2.png',
        ]);
        const isProcessing = ref(true);
        const goToGenerate = () => {
            Taro.navigateTo({
                url: '/pages/index/index',
            });
        };
        return {
            isProcessing,
            chooseImage,
            imageData,
            handleClick,
            goToGenerate,
            goToMy,
            ShareIcon,
            DownloadIcon,
        };
    },
};
</script>

<style lang="scss">
.index {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}
</style>
