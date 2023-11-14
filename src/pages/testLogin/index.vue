<template>
    <view class="container">
        <button @click="doLogin">Login</button>
        <button open-type="getPhoneNumber" @getphonenumber="doGetPhoneNumber">getPhoneNumber</button>
        <button open-type="getPhoneNumber" @getphonenumber="doGetRealtimePhoneNumber">getRealtimePhoneNumber</button>

        <!-- 文本展示框 -->
        <div :style="{ fontSize: '10px', width: '100%' }">
            <text> {{ log }}</text>
        </div>
    </view>
</template>

<script>
import { reactive, toRefs } from 'vue';
import Taro from '@tarojs/taro';

export default {
    name: 'Index',
    components: {},
    setup() {
        const state = reactive({
            log: '',
        });

        const doGetPhoneNumber = async (e) => {
            console.log('doGetPhoneNumber');
            console.log(e);
            // const res = await Taro.getPhoneNumber();
            // console.log(res);
        };

        const doGetRealtimePhoneNumber = async (e) => {
            console.log('doGetRealtimePhoneNumber');
            console.log(e);
            // const res = await Taro.getRealtimePhoneNumber();
            // console.log(res);
        };
        const getPhoneNumber = (e) => {
            console.log(e);
        };

        const doLogin = async () => {
            const res = await Taro.login();
            console.log(res);
            state.log += `login: ${JSON.stringify(res)}\n`;
            const loginRes = await Taro.request({
                method: 'POST',
                url: 'http://localhost:10100/api/v1/login',
                data: {
                    code: res.code,
                },
            });
            console.log(loginRes.data);
            state.log += `loginRes: ${JSON.stringify(loginRes.data)}\n`;
        };

        return {
            ...toRefs(state),
            doLogin,
            doGetPhoneNumber,
            getPhoneNumber,
            doGetRealtimePhoneNumber,
        };
    },
};
</script>
