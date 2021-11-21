<template>
  <var-button class="mt-10" type="primary" block @click="center = true">
    导入模型
  </var-button>
  <!-- 导入模型弹框 -->
  <var-popup v-model:show="center">
    <div class="block">
      拖入模型或点击
      <var-button type="primary" round size="mini" disabled>
        <var-icon name="plus" />
      </var-button>
    </div>
  </var-popup>
</template>


<script>
import { ref } from "vue";
export default {
  name: "ImportModel",
  setup() {
    const center = ref(false);
    return {
      center,
    };
  },
};
</script>

<style scoped>
.mt-10 {
  width: 150px;
  height: 30px;
  margin-right: 3vh;
}
.block {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 550px;
  height: 280px;
  color: rgba(100, 100, 100, 0.534);
  border: 5px dashed;
  user-select: none;
}
</style>