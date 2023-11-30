<template>
    <view>
        <DrawPage v-if="activeTab === 0" />
        <MyPage v-if="activeTab === 1" />

        <nut-tabbar id="tab_bar" @tab-switch="tabSwitch" :bottom="true">
            <nut-tabbar-item tab-title="生成">
                <template #icon="props">
                    <img :src="props.active ? icon.home.active : icon.home.normal" alt="" />
                </template>
                <!-- <router-link to="/draw"></router-link> -->
            </nut-tabbar-item>
            <nut-tabbar-item tab-title="我的">
                <template #icon="props">
                    <img :src="props.active ? icon.my.active : icon.my.normal" alt="" />
                </template>
            </nut-tabbar-item>
        </nut-tabbar>
    </view>
</template>

<script>
import { ref } from 'vue';
import './index.scss';
import DrawPage from '../draw/index.vue';
import MyPage from '../my/index.vue';
import Taro from '@tarojs/taro';

const icon = {
    home: {
        normal: require('../../../assets/images/icon_tabbar_home_normal.png'),
        active: require('../../../assets/images/icon_tabbar_home_active.png'),
    },
    my: {
        normal: require('../../../assets/images/icon_tabbar_my_normal.png'),
        active: require('../../../assets/images/icon_tabbar_my_active.png'),
    },
};

export default {
    name: 'Index',
    components: {
        DrawPage,
        MyPage,
    },
    state: {},

    onLoad() {
        console.log('[/pages/index/index] onLoad()');

        const token = Taro.getStorageSync('token');
        if (!token) {
            console.log('[/pages/index/index] token not exist');
            Taro.redirectTo({
                url: '/pages/homepage/index',
            });
        }
    },

    setup() {
        const activeTab = ref(0);

        const tabSwitch = (item, index) => {
            console.log(index);
            activeTab.value = index;
            console.log('Now active tab is', activeTab);
        };

        return {
            icon,
            tabSwitch,
            activeTab,
        };
    },
};
</script>
