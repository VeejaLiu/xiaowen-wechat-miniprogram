<template>
    <div>
        <div>纹身风格</div>
        <div><text style="">已选中风格:</text> {{ gridItems[selectedStyle].text }}</div>
    </div>

    <div id="index-styles">
        <div
            v-for="(item, index) in gridItems"
            :key="index"
            :class="{ 'grid-item': true, selected: selectedStyle === index }"
            @click="selectedStyle = index"
        >
            <img class="index-styles-image" :src="StyleImage" alt="Style Image" />
            <!--                <div class="image-mask" v-if="selectedStyle === index"></div>-->
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import StyleImage from '../../../assets/images/style.png';

export default {
    name: 'Index',
    components: {},
    setup() {
        const state = reactive({
            selectedStyle: 0,
        });

        return {
            StyleImage,
            ...toRefs(state),
            gridItems: [
                { text: '文字1', styleImage: 'StyleImage1' },
                { text: '文字2', styleImage: 'StyleImage2' },
                { text: '文字3', styleImage: 'StyleImage3' },
                { text: '文字1', styleImage: 'StyleImage1' },
                { text: '文字2', styleImage: 'StyleImage2' },
                { text: '文字3', styleImage: 'StyleImage3' },
                { text: '文字1', styleImage: 'StyleImage1' },
                { text: '文字2', styleImage: 'StyleImage2' },
                { text: '文字3', styleImage: 'StyleImage3' },
                { text: '文字3', styleImage: 'StyleImage3' },
            ],
        };
    },
};
</script>

<style lang="scss">
.index {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

#index-styles {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    padding: 10px;
}

.grid-item {
    display: flex;
    aspect-ratio: 1;
}

.image-container {
    position: relative;
}

.selected {
    border-radius: 20px;
    border: 10px solid var(--primary, #9ff432);
    box-shadow:
        0px 4.20513px 11px 0px rgba(0, 0, 0, 0.08),
        -2.80342px -2.80342px 3.50427px 0px rgba(0, 0, 0, 0.02);
}

.index-styles-image {
    width: 100%;
    height: 100%;
    border-radius: 10px;
}
</style>
