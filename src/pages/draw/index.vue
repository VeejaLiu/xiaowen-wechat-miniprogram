<template>
    <div class="drawIndex">
        <!-- Top -->
        <div class="top">
            风格
            <div :style="{ marginTop: '0.5rem' }">
                <text :style="{ color: 'rgba(0, 0, 0, 0.6)' }">已选:</text>
                {{ tattooStyles[selectedStyle].name }}
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
                    @click="selectedStyle = index"
                    :style="{
                        // border: '1px solid rgba(0, 0, 0, 0.2)',
                        backgroundColor: 'none',
                        '--nut-grid-item-content-padding': '5px',
                    }"
                >
                    <img
                        :class="{ 'styles-image': true, 'styles-image-selected': selectedStyle === index }"
                        :src="item.icon"
                        alt="Style Image"
                    />
                </nut-grid-item>
            </nut-grid>
        </div>
        <!-- Styles image selector End -->

        <!-- Prompt Input -->
        <div class="prompt-div">
            <div class="prompt-title">描述</div>
            <!-- 显示字数 -->
            <nut-textarea class="prompt-textarea" v-model="prompt" limit-show max-length="50" />
        </div>
        <!-- Prompt Input End -->

        <!--
        Bottom, including:
        1. Button to go to generate result page
        2. Quota floating
        3. Quota consumption per time
         -->
        <div class="bottom">
            <div class="bottom-generate">
                <nut-button class="generate_btn" block @click="goToGeneResPage">
                    <p>制作纹身</p>
                </nut-button>
                <div class="quota-consume-tip">
                    10
                    <img :style="{ width: '1vh', height: '1vh' }" :src="CoinImage" alt="Coin Image" />
                    /次
                </div>
            </div>
            <div class="quota-floating flex-row items-center shrink-0">
                <img
                    class="shrink-0 image_6"
                    src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/654c561c5a7e3f03102666c0/654f17d1f9a7df001222bfcc/16996823081082869059.png"
                    alt="Image"
                />
                <span class="font_1 text_9">{{ user_quota }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue';
import './index.scss';
import CoinImage from '../../../assets/images/coin.png';
import Taro from '@tarojs/taro';
import { tattooStyles } from './TattooStyle';

export default {
    name: 'Index',
    components: {},
    setup() {
        const prompt = ref('');
        const state = reactive({
            selectedStyle: 0,
            user_quota: 0,
        });

        const goToGeneResPage = () => {
            console.log('go to generate_result_detail');
            Taro.navigateTo({
                url: '/pages/generate_result_detail/index',
            });
        };

        return {
            prompt,
            goToGeneResPage,
            CoinImage,
            ...toRefs(state),
            tattooStyles,
        };
    },
};
</script>
