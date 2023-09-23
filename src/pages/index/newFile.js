import { ref } from 'vue';
import Taro from '@tarojs/taro';

export default (await import('vue')).defineComponent({
name: 'Index',
components: {},
setup() {
const prompt = ref('');

const isLoading = ref(false);
const imgData = ref('https://fastly.jsdelivr.net/npm/@vant/assets/apple-4.jpeg');

const handleClick = () => {
isLoading.value = true;
Taro.request({
url: 'http://123.60.97.192/api/v1/draw',
method: 'POST',
data: {
prompt: prompt.value
},
header: {
'content-type': 'application/json' // 默认值
},
success: function (res) {

imgData.value = 'data:image/jpeg;base64,' + res.data;
isLoading.value = false;
}
});
};

return {
prompt,
imgData,
isLoading,
handleClick
};
}
});
