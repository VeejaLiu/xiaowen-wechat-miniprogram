<template>
  <view class="index">
    <nut-cell >
      <nut-textarea v-model="prompt"  placeholder="请输入提示词"/>
    </nut-cell>
    <nut-button block :loading="isLoading" type="info" @click="handleClick">生成</nut-button>
    <div class="img-box">
      <img src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-4.jpeg" >
    </div>
    <nut-button block :loading="isLoading" type="info" @click="handleClick">复制</nut-button>
    <!-- <nut-image-preview :show="showPreview" :images="imgData" @close="hideFn" /> -->
  </view>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'Index',
  components: {
  },
  setup() {
    const prompt = ref('请输入内容');

    const isLoading = ref(false);

    const handleClick = () => {
      isLoading.value = true;
    };

    return {
      prompt,
      isLoading,
      handleClick
    }
  }
}
</script>

<style lang="scss">
.img-box {
  padding-top: 50px;
  padding-bottom: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center; 
}
</style>
