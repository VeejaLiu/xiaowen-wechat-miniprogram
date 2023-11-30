import { createApp } from 'vue';
import './app.scss';
import '@nutui/nutui-taro/dist/style.css';
import { IconFont } from '@nutui/icons-vue-taro';
import Taro from '@tarojs/taro';

const App = createApp({
    async onLaunch(options) {
        console.log('[app.js] onLaunch', options);

        Taro.checkSession({
            success: function () {
                //session_key 未过期，并且在本生命周期一直有效
                console.log('[app][onLaunch] session_key 未过期');
            },
            fail: async function () {
                // session_key 已经失效，需要重新执行登录流程
                console.log('[app][onLaunch] session_key 已经失效');
                const res = await Taro.login();
                if (res.errMsg !== 'login:ok') {
                    console.log('[app][onLaunch] Taro.login fail');
                    Taro.showToast({
                        title: '登录失败,请重试',
                        icon: 'none',
                        duration: 2000,
                    });
                    return;
                }
                console.log(`[app][onLaunch] Taro.login res: ${JSON.stringify(res)}`);

                const loginRes = await Taro.request({
                    method: 'POST',
                    url: 'http://localhost:10100/api/v1/login',
                    data: { code: res.code },
                });
                console.log(`[app][onLaunch] backend login res: ${JSON.stringify(loginRes)}`);
            },
        });
    },
    onLoad(options) {
        console.log('[app.js][onLoad]', options);
    },
    onShow(options) {
        console.log('[app.js] onShow', options);
    },
    // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});

App.use(IconFont);

export default App;
