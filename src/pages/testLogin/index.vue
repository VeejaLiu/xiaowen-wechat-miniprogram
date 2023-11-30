<template>
    <view class="container">
        <button @click="doLogin">Login</button>
        <button open-type="getPhoneNumber" @getphonenumber="doGetPhoneNumber">getPhoneNumber</button>
        <button open-type="getPhoneNumber" @getphonenumber="doGetRealtimePhoneNumber">getRealtimePhoneNumber</button>
        <button @click="doShareImage">ShareImage</button>
        <button @click="getImageInfo">Get Image Info</button>
        <button open-type="share" @click="doShowShareMenu">Show Share Menu</button>

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

    onShareAppMessage() {
        console.log('onShareAppMessage');
        return {
            title: '这个小程序太棒了，你也来试试吧',
            path: '/pages/index/index?id=123',
        };
    },

    useShareAppMessage(res) {
        console.log('useShareAppMessage');
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target);
        }
        return {
            title: '自定义转发标题',
            path: '/page/user?id=123',
        };
    },

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
        const doShareImage = async () => {
            console.log('doShareImage');
            Taro.downloadFile({
                url: 'https://img-blog.csdnimg.cn/6a0de88dd9ef4ee6b508051a3b1ec571.png',
                success: (res) => {
                    console.log(res);
                    Taro.showShareImageMenu({
                        path: res.tempFilePath,
                        needShowEntrance: true,
                        style: 'v2',
                    });
                },
                fail: (err) => {
                    console.log(err);
                },
            });
        };
        const getImageInfo = async () => {
            const res = await Taro.getImageInfo({
                src: 'https://img-blog.csdnimg.cn/6a0de88dd9ef4ee6b508051a3b1ec571.png',
            });
            console.log(res);
            Taro.showShareImageMenu({
                path: res.path,
                needShowEntrance: true,
                style: 'v2',
            });
        };

        const doShowShareMenu = async () => {
            console.log('doShowShareMenu');
            Taro.showShareMenu({
                withShareTicket: true,
                menus: ['shareAppMessage', 'shareTimeline'],
            });
        };
        return {
            ...toRefs(state),
            doLogin,
            doGetPhoneNumber,
            getPhoneNumber,
            doGetRealtimePhoneNumber,
            doShareImage,
            getImageInfo,
            doShowShareMenu,
        };
    },
};
</script>
