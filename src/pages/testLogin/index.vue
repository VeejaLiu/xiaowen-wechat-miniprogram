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

            /*
             * Login
             */
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

            console.log(e);
            console.log(JSON.stringify(e.detail));
            state.log += `loginRes: ${JSON.stringify(e.detail)}\n`;
            if (e.detail.errMsg === 'getPhoneNumber:ok') {
                console.log('getPhoneNumber ok');
                const callBackendResult = await Taro.request({
                    header: {
                        'content-type': 'application/json',
                        token: loginRes.data.token,
                    },
                    method: 'POST',
                    url: 'http://localhost:10100/api/v1/login/getPhoneNumber',
                    data: {
                        token: loginRes.data.token,
                        code: e.detail.code,
                        encryptedData: e.detail.encryptedData,
                        iv: e.detail.iv,
                    },
                });
                console.log(callBackendResult.data);
            } else {
                console.log('getPhoneNumber fail');
            }
        };

        const doGetRealtimePhoneNumber = async (e) => {
            console.log('doGetRealtimePhoneNumber');
            console.log(e);
            console.log(JSON.stringify(e.detail));

            if (e.detail.errMsg === 'getPhoneNumber:ok') {
                console.log('getPhoneNumber ok');
                const callBackendResult = await Taro.request({
                    method: 'POST',
                    url: 'http://localhost:10100/api/v1/admin/testCode',
                    data: {
                        code: e.detail.code,
                        encryptedData: e.detail.encryptedData,
                        iv: e.detail.iv,
                    },
                });
                console.log(callBackendResult.data);
            } else {
                console.log('getPhoneNumber fail');
            }
        };
        const getPhoneNumber = async (e) => {
            console.log('getPhoneNumber');
            console.log(e);
            console.log(JSON.stringify(e.detail));
            state.log += `loginRes: ${JSON.stringify(e.detail)}\n`;
            if (e.detail.errMsg === 'getPhoneNumber:ok') {
                console.log('getPhoneNumber ok');
                const callBackendResult = await Taro.request({
                    method: 'POST',
                    url: 'http://localhost:10100/api/v1/admin/testCode',
                    data: {
                        code: e.detail.code,
                        encryptedData: e.detail.encryptedData,
                        iv: e.detail.iv,
                    },
                });
                console.log(callBackendResult.data);
            } else {
                console.log('getPhoneNumber fail');
            }
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
