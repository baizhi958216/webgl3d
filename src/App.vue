<template>
  <el-container>
    <el-header>
      <el-button type="text">
        <el-icon size="15px"><open /></el-icon>
        <span>XR虚拟摄影 demo</span>
      </el-button>
      <el-button type="text">
        <span>关于</span>
      </el-button>
    </el-header>
    <!-- 顶导航栏 -->

    <el-container>
      <el-aside style="width: 300px">
        <div class="demo-collapse">
          <el-collapse v-model="activeNames" @change="handleChange" style="width:  220px">
            <el-collapse-item title="演示" name="1">
              <el-radio-group v-model="radio">
                <el-radio :label="1">3D</el-radio>
                <el-radio :label="2">2D</el-radio>
              </el-radio-group>
              <!-- <div>啥都没</div> -->
            </el-collapse-item>
            <el-collapse-item title="模型" name="2">
              <!-- <div>啥都没</div> -->
            </el-collapse-item>
            <el-collapse-item title="动作" name="3">
              <!-- <div>啥都没</div> -->
            </el-collapse-item>
            <el-collapse-item title="音效" name="4">
              <!-- <div>啥都没</div> -->
            </el-collapse-item>
            <el-collapse-item title="场景" name="5">
              <el-select v-model="value" placeholder="在下拉菜单中选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <!-- <div>啥都没</div> -->
            </el-collapse-item>
            <!-- 重置 -->
            <el-tooltip content="还原场景" placement="right" effect="light">
              <el-button
                plain
                @click="openCenter"
                style="
                  margin: 20px 0 20px 0;
                  position: relative;
                  left: 50%;
                  transform: translateX(-50%);
                "
                >重置</el-button
              >
            </el-tooltip>
          </el-collapse>
        </div>
      </el-aside>
      <!-- 左模块 -->

      <el-main>
        <div id="canvas">
          <div id="modelbox">
            <canvas id="three"></canvas>
          </div>
        </div>
      </el-main>
      <!-- 主canvas -->
    </el-container>
  </el-container>
</template>

<script>
import * as THREE from "three";
import * as Stats from "stats.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Open } from "@element-plus/icons";
import { defineComponent, ref } from "vue";
import { ElMessage } from "element-plus";
// import { ref } from 'vue'
export default defineComponent({
  name: "App",
  mounted() {
    this.initThree();
  },
  components: {
    Open,
  },
  setup() {
    const activeNames = ref(["1"]);
    const openCenter = () => {
      ElMessage({
        showClose: true,
        message: "成功",
        center: true,
        type: "success",
      });
    };
    // const handleChange = (val) => {
    //   console.log(val);
    // };
    return {
      activeNames,
      openCenter,
      radio: ref(1),
      options: ref([
        {
          value: "Option1",
          label: "场景一",
        },
        {
          value: "Option2",
          label: "场景二",
        },
      ]),
      value: ref(""),
      // handleChange,
    };
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
      camera.position.set(10, 10, 10);
      // 渲染器
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
      });
      renderer.setSize(cWidth, cHeight);
      // 创建一个大盒子cube
      const geometry = new THREE.BoxGeometry(120 * 5, 100 * 5, 100 * 5);
      // 创建一个小球littleGeometry
      const littleGeometry = new THREE.IcosahedronGeometry(1, 60, 1);

      // 载入贴图
      const textureloader = new THREE.TextureLoader();
      const texture = textureloader.load(
        "https://uploadstatic.mihoyo.com/contentweb/20200410/2020041019014847737.png"
      );
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
      });
      const textureloader2 = new THREE.TextureLoader();
      const texture2 = textureloader2.load(
        "https://uploadstatic.mihoyo.com/contentweb/20191114/2019111412090396621.png"
      );
      const material2 = new THREE.MeshBasicMaterial({
        map: texture2,
        side: THREE.DoubleSide,
      });
      const cube = new THREE.Mesh(geometry, material);
      const littlecube = new THREE.Mesh(littleGeometry, material2);
      // 在场景加入创建的盒子cube
      scene.add(cube);
      scene.add(littlecube);
      // FPS显示
      const stats = new Stats();
      stats.setMode(0);
      stats.domElement.style.opacity = "0.8";
      document.getElementById("modelbox").appendChild(stats.domElement);
      // 渲染场景
      const animate = function () {
        stats.begin();
        requestAnimationFrame(animate);
        // littlecube.rotation.x += 0.1;
        // cube.rotation.x += 0.001;
        // cube.rotation.y -= 0.001;
        // cube.rotation.z += 0.001;
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
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.demo-collapse {
  margin-top: 20px;
  /* text-align: center; */
  display: flex;
  justify-content: center;
  user-select: none;
  align-items: center;
}
#canvas {
  height: 100%;
  width: 100%;
}
#modelbox,
#three {
  width: 1000px;
  height: 600px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
