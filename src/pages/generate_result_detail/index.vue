<template>
    <view class="generate-result-detail">
        <!-- Top -->
        <div
            :style="{
                width: 'auto',
                height: 'auto',
                marginLeft: '1.5rem',
                marginRight: '1.5rem',
                'font-weight': 500,
                'justify-content': 'space-between',
            }"
        >
            <p>
                风格:
                <text :style="{ color: 'rgba(0, 0, 0, 0.6)' }">点刺</text>
            </p>
            <br />
            <p>
                描述:
                <text :style="{ color: 'rgba(0, 0, 0, 0.6)' }">带刺的玫瑰</text>
            </p>
        </div>
        <!-- Top End -->

        <div class="img-area">
            <img class="image-show" :src="imageData[chooseImage]" />
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
                <img class="image-show" :src="image" />
            </nut-grid-item>
        </nut-grid>

        <div class="btn-area" v-if="isProcessing">
            <nut-button class="btn" color="black">生成中</nut-button>
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
