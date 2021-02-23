<template>
  <div class="wrapper">
    <div class="wrapper-left">
      <div class="title">
        <span>摄像头:</span>
        <el-select v-model="deviceId" placeholder="请选择" @change="changeDev">
          <el-option
            v-for="item in deviceList"
            :key="item.deviceId"
            :label="item.label"
            :value="item.deviceId">
          </el-option>
        </el-select>
      </div>
      <div class="video-wrapper">
        <video ref="video" width="80%" autoplay></video>
      </div>
    </div>
    <div class="wrapper-right">
      <div class="text-wrapper">
        <p class="title">看不到画面？试试如下方法：</p>
        <p class="text">1.请允许浏览器使用摄像头权限</p>
        <p class="text">2.确认摄像头未被其他程序占用</p>
        <p class="text">3.选择外置摄像头或换一台电脑</p>
        <p class="ps">
          注意：摄像头损坏可正常直播，只是观看页无法看到您的摄像头画面
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      deviceId: ''
    };
  },
  props: {
    deviceList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  components: {

  },
  watch: {
    deviceList() {
      if (this.deviceList && this.deviceList.length > 0) {
        this.deviceId = this.deviceList[0].deviceId
      }
    }
  },
  created () {
    this.callCamera()
  },
  mounted () {

  },
  destroyed() {
    console.log(123)
  },
  methods: {
    // 开启摄像头
    callCamera () {
      navigator.mediaDevices.getUserMedia({
          video: true
      }).then(success => {
          this.$refs['video'].srcObject = success;
          this.$refs['video'].play()
      }).catch(error => {
          console.error('摄像头开启失败，请检查摄像头是否可用！' + error)
      })
    },
    // 切换设备
    changeDev() {
      console.log(this.deviceId)
      const videoConstraints = {};
      videoConstraints.deviceId = { exact: this.deviceId };
      var constraints = {
        video: videoConstraints,
      };
      this.getUserMedia(constraints);
    },
    getUserMedia(constraints, success, error) {
      if (navigator.mediaDevices.getUserMedia) {
        //最新的标准API
        navigator.mediaDevices.getUserMedia(constraints).then(success=>{
          // 摄像头开启成功
          this.$refs['video'].srcObject = success
          // 实时拍照效果
          this.$refs['video'].play()
        }).catch(error);
      } else if (navigator.webkitGetUserMedia) {
        //webkit核心浏览器
        navigator.webkitGetUserMedia(constraints,success, error)
      } else if (navigator.mozGetUserMedia) {
        //firfox浏览器
        navigator.mozGetUserMedia(constraints, success, error);
      } else if (navigator.getUserMedia) {
        //旧版API
        navigator.getUserMedia(constraints, success, error);
      }
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
  margin: 20px 0px;
  text-align: left;
}
.wrapper .wrapper-left,.wrapper-right {
  flex: 1;
  min-height: 100px;
}
.wrapper .wrapper-right {
  border-left: 1px dashed rgba(0, 0, 0, 0.1);
}
.wrapper .wrapper-right {
  display: flex;
  justify-content: center;
  align-items: center;
}
.video-wrapper {
  width: 100%;
  text-align: center;
  margin-top: 10px;
}
.video-wrapper video {
  /* max-height: 200px; */
}
</style>
