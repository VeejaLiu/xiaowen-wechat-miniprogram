<template>
    <!-- User info Start -->
    <div class="flex-row items-center section_3 space-x-20">
        <div class="flex-row items-center flex-auto">
            <div class="shrink-0 section_4"></div>
            <span class="font_1 text_3">LesliLesliLesliLesli</span>
            <img
                class="shrink-0 image_6"
                src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/654c561c5a7e3f03102666c0/654f17d1f9a7df001222bfcc/16996823100036226984.png"
            />
        </div>
        <div class="flex-row items-center shrink-0 section_5 space-x-4" @click="goToGetQuota()">
            <img
                class="shrink-0 image_5"
                src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/654c561c5a7e3f03102666c0/654f17d1f9a7df001222bfcc/16996823099847673226.png"
            />
            <span class="font_1 text_4">60</span>
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
        <div class="flex-col list-item space-y-16" v-for="(history, index) in historyData" :key="index">
            <div class="flex-row justify-between items-center group_8">
                <span class="font_3 text_5">{{ history.style }} </span>
                <div class="flex-row items-center space-x-2" @click="goToGeneResPage()">
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
                    v-for="(image, index) in history.image"
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

export default {
    name: 'Index',
    components: {},
    setup() {
        // 同样的数据重复10遍
        const style = '点刺';
        const description = '带刺的玫瑰';

        const images = [
            'http://123.60.97.192:9001/pic/2023-11-08T22:40:13.929681_1.png',
            'http://123.60.97.192:9001/pic/2023-11-08T22:40:13.929681_2.png',
            'http://123.60.97.192:9001/pic/2023-11-08T22:32:21.972631_1.png',
            'http://123.60.97.192:9001/pic/2023-11-08T22:32:21.972631_2.png',
        ];

        const historyData = Array(10).fill({
            style,
            description,
            image: images,
        });
        const handleClick = () => {};

        const goToGetQuota = () => {
            console.log('go to get_quota');
            Taro.navigateTo({
                url: '/pages/get_quota/index',
            });
        };

        const goToGeneResPage = () => {
            console.log('go to generate_result_detail');
            Taro.navigateTo({
                url: '/pages/generate_result_detail/index',
            });
        };

        return {
            goToGetQuota,
            goToGeneResPage,
            historyData,
            handleClick,
        };
    },
};
</script>
