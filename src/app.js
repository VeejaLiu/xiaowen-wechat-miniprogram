import { createApp } from 'vue';
import './app.scss';
import '@nutui/nutui-taro/dist/style.css';
import { IconFont } from '@nutui/icons-vue-taro';

const App = createApp({
    async onLaunch(options) {
        console.log('[app.js] onLaunch', options);
    },
    onLoad(options) {
        console.log('[app.js] onLoad', options);
    },
    onShow(options) {
        console.log('[app.js] onShow', options);
    },
    // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});

App.use(IconFont);

export default App;
