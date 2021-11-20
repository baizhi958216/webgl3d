<template>
  <div id="container">
    <var-loading type="cube" id="loading" />

    <div id="left">
      <div id="lTop">
        <!-- 导入模型 -->
        <ImportModel />

        <!-- 模型区 -->
        <var-card
          class="card-1"
          :src="require('../assets/xier.jpeg')"
          fit="contain"
        >
          <template #extra>
            <var-button
              type="success"
              @click="modeladd"
              style="margin-right: 10px"
              >添加</var-button
            >
            <var-button type="danger" @click="modeldel">删除</var-button>
          </template>
        </var-card>
      </div>
    </div>

    <div id="right">
      <div class="modelbox">
        <canvas id="three"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import ImportModel from "./ImportModel.vue";
import { Snackbar } from "@varlet/ui";
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
      camera.position.set(0, 0, 2);
      // 渲染器
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
      });
      renderer.setSize(cWidth, cHeight);
      // 创建一个大盒子cube
      const geometry = new THREE.BoxGeometry(500, 500, 500);
      const littleGeometry = new THREE.IcosahedronGeometry(1, 1, 1);
      // 载入贴图
      const textureloader = new THREE.TextureLoader();
      const texture = textureloader.load(
        "http://5b0988e595225.cdn.sohucs.com/images/20200302/dbee068ff2fa4df1b0314d3f8cc38a49.jpeg"
      );
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
      });
      const cube = new THREE.Mesh(geometry, material);
      const littlecube = new THREE.Mesh(littleGeometry, material);
      // 在场景加入创建的盒子cube
      scene.add(cube);
      scene.add(littlecube);
      // FPS显示
      const stats = new Stats();
      stats.setMode(0);
      stats.domElement.style.position = "fixed";
      stats.domElement.style.left = "25%";
      stats.domElement.style.top = "10%";
      document.body.appendChild(stats.domElement);
      // 渲染场景
      const animate = function () {
        stats.begin();
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        cube.rotation.z += 0.01;
        littlecube.rotation.x += 0.01;
        littlecube.rotation.y += 0.01;
        littlecube.rotation.z += 0.01;
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
  setup() {
    const modeladd = () => {
      Snackbar({
        content: "已加载",
        type: "success",
        duration: 500,
      });
    };
    const modeldel = () => {
      Snackbar({
        content: "已删除",
        type: "error",
        duration: 500,
      });
    };
    return {
      modeladd,
      modeldel,
    };
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
.card-1 {
  margin-top: 30px;
  width: 80%;
  line-height: 2px;
}
#right {
  display: flex;
  align-items: center;
  position: absolute;
  left: 25%;
  height: 100%;
  width: 75%;
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