<template>
  <div id="themechk">
    <var-switch v-model="value" @click="toggleTheme(), swc()" size="15" />
    <i class="fa fa-spin" :class="[SunOrMoon]"></i>
  </div>
  <XRMain />
</template>

<script>
import XRMain from "./components/XRMain.vue";
import dark from "@varlet/ui/es/themes/dark";
import { Ripple, Switch, StyleProvider } from "@varlet/ui";
import { ref } from "vue";
import "font-awesome/css/font-awesome.min.css";
export default {
  name: "App",
  components: {
    XRMain,
  },
  setup() {
    let SunOrMoon = "fa-moon-o";
    const value = ref(true);
    let currentTheme = dark;
    StyleProvider(currentTheme);
    const toggleTheme = () => {
      currentTheme = currentTheme ? null : dark;
      StyleProvider(currentTheme);
    };
    return {
      toggleTheme,
      Ripple,
      value,
      Switch,
      SunOrMoon,
    };
  },
  methods: {
    swc() {
      if (this.value == true) {
        this.SunOrMoon = "fa-sun-o";
      } else {
        this.SunOrMoon = "fa-moon-o";
      }
    },
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  border: 0;
}
body {
  transition: background-color 0.25s;
  color: var(--color-text);
  background-color: var(--color-body);
}
#themechk {
  position: fixed;
  z-index: 9999;
  width: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0 0 30px;
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
