<template>
    <view class="index">
        <nut-avatar size="large" @click="goToMy">
            <img
                src="https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png"
                alt=""
            />
        </nut-avatar>
        <nut-button block color="" @click="goToQuota">剩余钻石: 110000 </nut-button>

        <nut-cell>
            <nut-textarea v-model="prompt" :disabled="textAreaDisabled" placeholder="请输入提示词" />
        </nut-cell>

        <nut-button block :loading="isLoading" color="black" @click="goToGenerateResultDetail">生成 </nut-button>
        <nut-grid :border="false" :column-num="2" square>
            <nut-grid-item v-for="(image, index) in imgData" :key="index">
                <img mode="heightFix" :src="image" alt="" />
            </nut-grid-item>
        </nut-grid>
    </view>
</template>

<script>
import { ref } from 'vue';
import Taro from '@tarojs/taro';

export default {
    name: 'Index',
    components: {},
    state: {},

    setup() {
        const prompt = ref('一只可爱的小猫');
        const textAreaDisabled = ref(false);
        const isLoading = ref(false);
        const imgData = ref('');

        const goToMy = () => {
            Taro.navigateTo({
                url: '/pages/my/index',
            });
        };

        const goToQuota = () => {
            Taro.navigateTo({
                url: '/pages/get_quota/index',
            });
        };

        const login = async () => {
            console.log('Click login');
            const res = await Taro.login();
            console.log(res);
        };
        const goToGenerateResultDetail = () => {
            Taro.navigateTo({
                url: '/pages/generate_result_detail/index',
            });
            // isLoading.value = true;
            // textAreaDisabled.value = true;
            // try {
            //     const res = await Taro.request({
            //         // url: 'http://123.60.97.192/api/v1/draw',
            //         url: 'http://localhost:10100/api/v1/draw',
            //         method: 'POST',
            //         data: {
            //             prompt: prompt.value,
            //         },
            //         timeout: 2 * 60 * 1000,
            //         header: {
            //             'content-type': 'application/json', // 默认值
            //         },
            //     });
            //     imgData.value = res.data.images.map((image) => image);
            // } catch (err) {
            //     await Taro.showToast({
            //         title: '生成失败，请稍后再试',
            //         icon: 'error',
            //         duration: 2000,
            //     });
            //     console.log(err);
            // } finally {
            //     isLoading.value = false;
            //     textAreaDisabled.value = false;
            // }
        };

        return {
            prompt,
            textAreaDisabled,
            imgData,
            isLoading,
            goToGenerateResultDetail,
            goToMy,
            goToQuota,
            login,
        };
    },
};
</script>
