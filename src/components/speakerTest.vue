<template>
  <div class="wrapper">
    <div class="wrapper-left">
      <div class="title">
        <span>摄像头:</span>
        <el-select v-model="deviceId" placeholder="请选择" style="width: 100%;">
          <el-option
            v-for="item in deviceList"
            :key="item.deviceId"
            :label="item.label"
            :value="item.deviceId">
          </el-option>
        </el-select>
      </div>
      <div class="test-audio-btn" @click="playAudio">
        <i :class="isPlay ? 'el-icon-video-play':'el-icon-video-pause'"></i><span class="test">点此测试声音</span>
      </div>
    </div>
    <div class="wrapper-right">
      <div class="text-wrapper">
        <p class="title">听不到声音？试试如下方法：</p>
        <p class="text">1.请允许浏览器使用声音权限</p>
        <p class="text">2.请调高设备的扬声器音量</p>
        <p class="text">3.选择外置扬声器或换一台电脑</p>
        <p class="ps">
          注意：如需更换扬声器，请在电脑的声音设置中更改声音来源
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      deviceId: '',
      isPlay: false
    };
  },
  props: {
    deviceList: {
      type: Array,
      default: () => {
        return []
      }
    },
    audioSrc: {
      type: String,
      default: ''
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
    this.deviceId = this.deviceList[0].deviceId
  },
  mounted () {

  },
  methods: {
    playAudio() {
      const audio = document.createElement("audio");
      if (this.isPlay) {
        return
      }
      if (this.deviceId) {
        audio.src = this.audioSrc;
        this.isPlay = true
        setTimeout(() => {
          this.isPlay = false
        }, 1500);
        if (audio.setSinkId) {
          audio.setSinkId(this.deviceId).then(() => {
            console.log("检测扬声器ing");
            audio.play();
          });
        }
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
.wrapper .wrapper-left {
  padding-right: 10px;
}
.title {
  display: flex;
  align-items: center;
}
.title > span {
  width: 60px;
}
.wrapper .wrapper-right {
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px dashed rgba(0, 0, 0, 0.1);
}
.test-audio-btn {
  background-color: #31386d;
  border-radius: 4px;
  height: 30px;
  font-size: 12px;
  line-height: 30px;
  text-align: center;
  box-sizing: "border-box";
  cursor: pointer;
  color: #fff;
  margin-top: 10px;
  /* max-width: 210px; */
}

</style>
