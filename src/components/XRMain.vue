<template>
  <div id="container">
    <var-loading type="cube" id="loading" />

    <div id="left">
      <div id="lTop">
        <!-- 导入模型 -->
        <ImportModel />

        <!-- 模型区 -->
      </div>
    </div>

    <div id="right">
      <div id="modelbox">
        <canvas id="three"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import ImportModel from "./ImportModel.vue";
import * as THREE from "three";
import * as Stats from "stats.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default {
  name: "XRMain",
  mounted() {
    this.initThree();
  },
  methods: {
    initThree() {
      // 场景
      const scene = new THREE.Scene();
      const canvas = document.querySelector("#three");
      const myCanvas = canvas.getBoundingClientRect();
      const cWidth = myCanvas.width;
      const cHeight = myCanvas.height;
      // 相机
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0, 20);
      // 渲染器
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
      });
      renderer.setSize(cWidth, cHeight);
      // 创建一个大盒子cube
      const geometry = new THREE.BoxGeometry(800, 600, 800);
      const littleGeometry = new THREE.IcosahedronGeometry(1, 60, 1);
      // 载入贴图
      const textureloader = new THREE.TextureLoader();
      const texture = textureloader.load(
        "https://uploadstatic.mihoyo.com/contentweb/20191114/2019111412090396621.png"
      );
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
      });
      const textureloader2 = new THREE.TextureLoader();
      const texture2 = textureloader2.load(
        "https://uploadstatic.mihoyo.com/contentweb/20200410/2020041019014847737.png"
      );
      const material2 = new THREE.MeshBasicMaterial({
        map: texture2,
        side: THREE.DoubleSide,
      });
      const cube = new THREE.Mesh(geometry, material2);
      const littlecube = new THREE.Mesh(littleGeometry, material);
      // 在场景加入创建的盒子cube
      scene.add(cube);
      scene.add(littlecube);
      // FPS显示
      const stats = new Stats();
      stats.setMode(0);
      stats.domElement.style.position = "absolute";
      stats.domElement.style.opacity = "0.4";
      document.getElementById("modelbox").appendChild(stats.domElement);
      // 渲染场景
      const animate = function () {
        stats.begin();
        requestAnimationFrame(animate);
        littlecube.rotation.x += 0.1;
        renderer.render(scene, camera);
        stats.end();
      };
      animate();
      // 监听鼠标事件
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.addEventListener("change", () => {
        renderer.render(scene, camera);
      });
    },
  },
  components: {
    ImportModel,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#container {
  display: flex;
}
#left {
  position: absolute;
  width: 25%;
  height: 100%;
  min-width: 136px;
  display: flex;
  align-items: center;
}
#lTop {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
}
#right {
  display: flex;
  align-items: center;
  position: absolute;
  left: 25%;
  height: 100%;
  width: 75%;
}
#modelbox {
  width: 750px;
  height: 500px;
  position: relative;
}
#three {
  width: 750px;
  height: 500px;
  position: relative;
}
#loading {
  color: #2979ff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>