<template>
  <div id="container">
    <var-loading type="cube" id="loading"/>

    <div id="left">
      <div id="lTop">

        <!-- 导入模型 -->
        <ImportModel/>

        <!-- 模型区 -->
        <var-card class="card-1" :src="require('../assets/2@3x.png')" fit="contain">
        <template #extra>
          <var-button type="success" @click="modeladd" style="margin-right: 10px">添加</var-button>
          <var-button type="danger" @click="modeldel">删除</var-button>
        </template>
        </var-card>

      </div>
      
    </div>
    
    <div id="right">
        <var-image :radius="10" :src="require('../assets/1@3x.png')"/>
     
    </div>

    
  </div>
</template>

<script>
import ImportModel from './ImportModel.vue'
import { Snackbar } from '@varlet/ui'

export default {
  name: 'XRMain',
  components: {
    ImportModel
  },
  setup() {
    const modeladd = () => {
      Snackbar({
        content:'已加载',
        type:'success',
        duration:500
      })
    }
    const modeldel = () => {
      Snackbar({
        content:'已删除',
        type:'error',
        duration:500
      })
    }
    return {
      modeladd,
      modeldel
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#container{
  display: flex;
}
#left{
  position: absolute;
  width: 25%;
  height: 100%;
  min-width: 136px;
  display: flex;
  align-items: center;
}
#lTop{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
}
.card-1{
  margin-top: 30px;
  width: 80%;
  line-height: 2px;
}
#right{
  display: flex;
  align-items: center;
  position: absolute;
  left: 25%;
  height: 100%;
  width: 75%;
}
#loading{
  color: #2979ff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
</style>