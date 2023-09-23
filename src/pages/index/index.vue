<template>
    <view class="index">
        <nut-cell>
            <nut-textarea v-model="prompt" placeholder="请输入提示词" />
        </nut-cell>
        <nut-button block :loading="isLoading" color="black" @click="handleClick">生成</nut-button>
        <div v-if="imgData !== ''" class="img-box">
            <img :src="imgData" style="width: 256px; height: 256px" />
        </div>
    </view>
</template>

<script>
import { ref } from 'vue';
import Taro from '@tarojs/taro';
export default {
    name: 'Index',
    components: {},
    setup() {
        const prompt = ref('');

        const isLoading = ref(false);
        const imgData = ref('');

        const handleClick = () => {
            isLoading.value = true;
            Taro.request({
                url: 'http://123.60.97.192/api/v1/draw',
                method: 'POST',
                data: {
                    prompt: prompt.value,
                },
                timeout: 2 * 60 * 1000,
                header: {
                    'content-type': 'application/json', // 默认值
                },
                success: function (res) {
                    imgData.value = 'data:image/jpeg;base64,' + res.data;
                    isLoading.value = false;
                },
            });
        };

        return {
            prompt,
            imgData,
            isLoading,
            handleClick,
        };
    },
};
</script>

<style lang="scss">
.img-box {
    padding-top: 50px;
    padding-bottom: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
