<template>
    <div class="index">
        <!-- Top -->
        <div
            :style="{
                width: '100%',
                height: '100%',
                'margin-left': '1.5rem',
                'font-weight': 500,
                'justify-content': 'space-between',
            }"
        >
            纹身风格
            <div :style="{ marginTop: '0.5rem' }">
                <text :style="{ color: 'rgba(0, 0, 0, 0.6)' }">已选中风格:</text>
                {{ gridItems[selectedStyle].style }}
            </div>
        </div>
        <!-- Top End -->

        <!-- Styles -->
        <div id="styles">
            <div
                v-for="(item, index) in gridItems"
                :key="index"
                :class="{ 'grid-item': true, selected: selectedStyle === index }"
                @click="selectedStyle = index"
            >
                <img class="index-styles-image" :src="item.styleImage" alt="Style Image" />
            </div>
        </div>
        <!-- Styles End -->

        <!-- Prompt Input -->
        <div
            :style="{
                // width: '100%',
                height: '100%',
                'margin-left': '1.5rem',
                'margin-right': '1.5rem',
                'margin-top': '0.5rem',
                'font-weight': 500,
                'justify-content': 'space-between',
            }"
        >
            <div style="">纹身描述</div>
            <div
                :style="{
                    marginTop: '0.25rem',
                    width: '100%',
                    height: '7.5rem',
                    'border-radius': '0.75rem',
                    border: '2px solid var(--brand-1, #71FCB7)',
                }"
            >
                <textarea
                    :style="{
                        width: '100%',
                        margin: '0.5rem 0.5rem 0.5rem 0.5rem',
                    }"
                    bindblur="bindTextAreaBlur"
                    auto-height
                    placeholder="自动变高"
                />
            </div>
        </div>
        <!-- Prompt Input End -->

        <!-- Button -->
        <div
            :style="{
                marginTop: '1.19rem',
                marginLeft: '1.5rem',
            }"
        >
            <nut-button id="homepage_login_btn" block @click="doPopup">
                <p id="homepage_login_btn_text">开始制作</p>
            </nut-button>
            <div
                style="
                    height: auto;
                    text-align: center;
                    color: rgba(0, 0, 0, 0.7);
                    font-size: 13px;
                    font-weight: 400;
                    letter-spacing: 0.65px;
                    word-wrap: break-word;
                "
            >
                10
                <img :style="{ width: '12px', height: '12px' }" :src="CoinImage" alt="Coin Image" />
                /次
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue';
import CoinImage from '../../../assets/images/coin.png';

export default {
    name: 'Index',
    components: {},
    setup() {
        const prompt = ref('');
        const state = reactive({
            selectedStyle: 0,
        });

        return {
            CoinImage,
            ...toRefs(state),
            gridItems: [
                { index: 0, style: '风格1', styleImage: require('../../../assets/images/styles/style_0.png') },
                { index: 1, style: '风格2', styleImage: require('../../../assets/images/styles/style_1.png') },
                { index: 2, style: '风格3', styleImage: require('../../../assets/images/styles/style_2.png') },
                { index: 3, style: '风格4', styleImage: require('../../../assets/images/styles/style_3.png') },
                { index: 4, style: '风格5', styleImage: require('../../../assets/images/styles/style_4.png') },
                { index: 5, style: '风格6', styleImage: require('../../../assets/images/styles/style_5.png') },
                { index: 6, style: '风格7', styleImage: require('../../../assets/images/styles/style_6.png') },
                { index: 7, style: '风格8', styleImage: require('../../../assets/images/styles/style_7.png') },
                { index: 8, style: '风格9', styleImage: require('../../../assets/images/styles/style_8.png') },
            ],
        };
    },
};
</script>

<style lang="scss">
.index {
    width: 100%;
    height: 100%;
    font-family: 'PingFang SC', 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    //background-color: gray;
}

#top {
    width: 100%;
    height: 100%;
    margin-left: 24px;
    justify-content: space-between;
    //background-color: aquamarine;
}

#styles {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    margin-top: 0.75rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
}

.grid-item {
    display: flex;
    aspect-ratio: 1.22;
    border-radius: 20px;
    border: 1px solid rgba(0, 0, 0, 0.4);
}

.image-container {
    position: relative;
}

.selected {
    border-radius: 20px;
    border: 4px solid var(--primary, #71fcb7);
    //box-shadow:
    //    0px 4.20513px 11px 0px rgba(0, 0, 0, 0.08),
    //    -2.80342px -2.80342px 3.50427px 0px rgba(0, 0, 0, 0.02);
}

.index-styles-image {
    width: 100%;
    height: 100%;
    border-radius: 20px;
}

#homepage_login_btn {
    margin: 0 auto;
    width: 62%;
    background: radial-gradient(
            215.83% 83.33% at 100% 0%,
            rgba(255, 255, 255, 0.7) 0%,
            rgba(255, 255, 255, 0.07) 51.11%,
            rgba(255, 255, 255, 7e-5) 100%
        ),
        linear-gradient(46.59deg, rgba(13, 231, 255, 9e-5) 2.92%, rgba(13, 231, 255, 0.63) 88.7%), #9ff432;
    border: 0;
    border-radius: 131px;
}

#homepage_login_btn_text {
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0.05em;
    color: #010101;
}
</style>
