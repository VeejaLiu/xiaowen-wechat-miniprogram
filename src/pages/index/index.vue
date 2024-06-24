<template>
    <view>
        <DrawPage v-if="activeTab === 0" />
        <MyPage v-if="activeTab === 1" />

        <nut-tabbar id="tab_bar" @tab-switch="tabSwitch" :bottom="true">
            <nut-tabbar-item tab-title="">
                <template #icon="props">
                    <img :src="props.active ? icon.home.active : icon.home.normal" alt="" />
                </template>
                <!-- <router-link to="/draw"></router-link> -->
            </nut-tabbar-item>
            <nut-tabbar-item tab-title="">
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
import { SOURCE_PATH } from '../../constant/Urls';

const icon = {
    home: {
        normal: SOURCE_PATH + "/images/icon_tabbar_home_normal.svg",
        active: SOURCE_PATH + "/images/icon_tabbar_home_active.svg",
    },
    my: {
        normal: SOURCE_PATH + "/images/icon_tabbar_my_normal.svg",
        active: SOURCE_PATH + "/images/icon_tabbar_my_active.svg",
    },
};

export default {
    name: 'Index',
    components: {
        DrawPage,
        MyPage,
    },
    state: {},

    async onLoad() {
        // get params
        const options = Taro.getLaunchOptionsSync();
        console.log(`[index/index] onLoad() options: ${JSON.stringify(options)}`);
        const inviteBy = options?.query?.inviteBy;
        if (inviteBy) {
            console.log(`[index/index] onLoad() inviteBy: ${inviteBy}`);
            Taro.setStorageSync('inviteBy', inviteBy);
        } else {
            console.log(`[index/index] onLoad() inviteBy not exist`);
        }

        console.log('[/pages/index/index] onLoad()');
        const token = Taro.getStorageSync('token');
        if (!token) {
            console.log('[/pages/index/index] token not exist');
            await Taro.redirectTo({
                url: '/pages/homepage/index',
            });
        }

        // support share
        Taro.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
        });
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
