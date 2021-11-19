<template>
  <XRMain/>
</template>

<script>
import XRMain from './components/XRMain.vue'
export default {
  name: 'App',
  components: {
    XRMain
  }
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
  border: 0;
}
#app {
  position: absolute;
  top: 0;
  left: 0;
  min-width: 1000px;
  min-height: 600px;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  /* background-color: #CCC; */
}
</style>
