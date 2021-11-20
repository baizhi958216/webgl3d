<template>
<div id="themechk">
  <var-switch v-model="value" @click="toggleTheme(),swc()" size="15" />
  <i class="fa fa-spin" :class="[SunOrMoon]" style="position:absolute;margin-left:5px;margin-top:2px;"></i>
</div>
  <XRMain/>
</template>

<script>
import XRMain from './components/XRMain.vue'
import dark from '@varlet/ui/es/themes/dark'
import { Ripple,Switch,StyleProvider } from '@varlet/ui'
import { ref } from 'vue'
import 'font-awesome/css/font-awesome.min.css'
export default {
  name: 'App',
  components: {
    XRMain
  },
  setup() {
    let mswitcher = '日间'
    let SunOrMoon = 'fa-sun-o'
    const value = ref(false)
    let currentTheme
    const toggleTheme = () => {
      currentTheme = currentTheme ? null : dark
      StyleProvider(currentTheme)
    }
    return { 
      toggleTheme,
      Ripple,
      value,
      Switch,
      mswitcher,
      SunOrMoon
       }
  },
  methods:{
    swc(){
      if(this.value==true){
      this.mswitcher='日间'
      this.SunOrMoon='fa-sun-o'
    }else{
      this.mswitcher='夜间'
      this.SunOrMoon='fa-moon-o'
    }
    }
  }
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
  overflow: hidden;
  border: 0;
}
body {
  transition: background-color .25s;
  color: var(--color-text);
  background-color: var(--color-body);
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
}
</style>
