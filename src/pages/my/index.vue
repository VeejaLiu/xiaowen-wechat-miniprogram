<template>
    <div class="my-page">
        <!-- 个人信息-->
        <div class="my-info">
            <nut-avatar class="my-info-avatar" size="large">
                <img
                    src="https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png"
                    alt=""
                />
            </nut-avatar>
            用户名字XXX
        </div>

        <!-- 标题 -->
        <div class="history-title">生成历史</div>

        <div class="all-history" v-if="historyData.length === 0">
            <div class="history-item">
                <div>暂无历史记录</div>
            </div>
        </div>

        <!-- 生成历史-->
        <div class="all-history" v-if="historyData.length !== 0">
            <div class="history-item" v-for="(history, index) in historyData">
                <div class="history-item-style">{{ history.style }}</div>
                <div class="history-item-desc">{{ history.description }}</div>
                <nut-grid
                    class="history-item-images"
                    :border="false"
                    :column-num="4"
                    :style="{
                        'background-color': 'none',
                    }"
                >
                    <!-- 利用imageData进行循环 -->
                    <nut-grid-item
                        v-for="(image, index) in history.image"
                        :key="index"
                        :style="{
                            '--nut-grid-item-content-padding': '5px',
                            '--nut-grid-item-content-bg-color': 'none',
                        }"
                    >
                        <img class="history-item-images-image" :src="image" />
                    </nut-grid-item>
                </nut-grid>
            </div>
        </div>
    </div>
</template>

<script lang="js">
import Taro from '@tarojs/taro';
import './index.scss';

export default {
    name: 'Index',
    components: {},
    setup() {
        const historyData = [
            {
                style: '点刺',
                description: '带刺的玫瑰',
                image: [
                    'http://123.60.97.192:9001/pic/2023-11-08T22:40:13.929681_1.png',
                    'http://123.60.97.192:9001/pic/2023-11-08T22:40:13.929681_2.png',
                    'http://123.60.97.192:9001/pic/2023-11-08T22:32:21.972631_1.png',
                    'http://123.60.97.192:9001/pic/2023-11-08T22:32:21.972631_2.png',
                ],
            },
            {
                style: '点刺',
                description: '带刺的玫瑰',
                image: [
                    'http://123.60.97.192:9001/pic/2023-11-08T22:40:13.929681_1.png',
                    'http://123.60.97.192:9001/pic/2023-11-08T22:40:13.929681_2.png',
                    'http://123.60.97.192:9001/pic/2023-11-08T22:32:21.972631_1.png',
                    'http://123.60.97.192:9001/pic/2023-11-08T22:32:21.972631_2.png',
                ],
            },
            {
                style: '点刺',
                description: '带刺的玫瑰',
                image: [
                    'http://123.60.97.192:9001/pic/2023-11-08T22:40:13.929681_1.png',
                    'http://123.60.97.192:9001/pic/2023-11-08T22:40:13.929681_2.png',
                    'http://123.60.97.192:9001/pic/2023-11-08T22:32:21.972631_1.png',
                    'http://123.60.97.192:9001/pic/2023-11-08T22:32:21.972631_2.png',
                ],
            },
            {
                style: '点刺',
                description: '带刺的玫瑰',
                image: [
                    'http://123.60.97.192:9001/pic/2023-11-08T22:40:13.929681_1.png',
                    'http://123.60.97.192:9001/pic/2023-11-08T22:40:13.929681_2.png',
                    'http://123.60.97.192:9001/pic/2023-11-08T22:32:21.972631_1.png',
                    'http://123.60.97.192:9001/pic/2023-11-08T22:32:21.972631_2.png',
                ],
            },
        ];

        const handleClick = () => {};
        const goToGenerate = () => {
            Taro.navigateTo({
                url: '/pages/index/index',
            });
        };

        return {
            historyData,
            goToGenerate,
            handleClick,
        };
    },
};
</script>
