<template>
    <view class="index">
        <router-view></router-view>
        <nut-tabbar id="tab_bar" @tab-switch="tabSwitch" :bottom="true">
            <nut-tabbar-item tab-title="生成">
                <template #icon="props">
                    <img :src="props.active ? icon.home.active : icon.home.normal" alt="" />
                </template>
                <router-link to="/draw"></router-link>
            </nut-tabbar-item>
            <nut-tabbar-item tab-title="我的">
                <template #icon="props">
                    <img :src="props.active ? icon.my.active : icon.my.normal" alt="" />
                </template>
            </nut-tabbar-item>
            <router-link to="/my"></router-link>
        </nut-tabbar>
    </view>
</template>

<script>
import { ref } from 'vue';
import Taro from '@tarojs/taro';
import './index.scss';

import { createRouter, createWebHashHistory } from 'vue-router';
import Draw from '../draw/index.vue';
import My from '../my/index.vue';

const routes = [
    { path: '/draw', component: Draw },
    { path: '/my', component: My },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

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
    components: {},
    state: {},

    setup() {
        let activeTab = ref(0);

        const tabSwitch = (item, index) => {
            console.log(index);
            activeTab = index;
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
