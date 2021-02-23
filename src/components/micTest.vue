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
      <el-progress class="progress" :stroke-width="20" :percentage="progress" :show-text='false'></el-progress>
    </div>
    <div class="wrapper-right">
      <div class="text-wrapper">
        <p class="title">看不到音量条波动？试试如下方法：</p>
        <p class="text">1.请允许浏览器使用麦克风权限</p>
        <p class="text">2.确认麦克风未被其他程序占用</p>
        <p class="text">3.选择外置麦克风或换一台电脑</p>
        <p class="ps">注意：麦克风异常无法进入直播间</p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Client,
  deviceDetection
} from "urtc-sdk";
export default {
  data () {
    return {
      deviceId: '',
      isPlay: false,
      progress: 0,
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
    },
    deviceId() {
      if (this.deviceId) {
        this.testDevice(this.createStream(this.deviceId))
      }
    }
  },
  created () {
    this.deviceId = this.deviceList[0].deviceId
  },
  mounted () {

  },
  methods: {
    testDevice(callback) {
      const id = this.deviceId;
      deviceDetection(
        {
          audio: true,
          video: false,
          microphoneId: id,
        },
        (Result) => {
          if (Result.audio && Result.video) {
            // 麦克风和摄像头都可有和，发布或预览时可启用麦克风和摄像头
          } else if (Result.audio) {
            // 麦克风可用，发布或预览时能启用麦克风
          } else if (Result.video) {
            // 摄像头可用，发布或预览时能启用摄像头
          }
          callback && callback();
        }
      );
    },
    createStream(id) {
      this.client = new Client('', '');
      console.log('createStream id', id)
      this.client.createStream(
        {
          previewId: id,
          audio: true,
          video: false,
          microphoneId: id,
        },
        (error, stream) => {
          if (!error) {
            console.log("create audio stream success:", stream);
            this.timer = setInterval(() => {
              this.progress = this.client.getAudioVolume(stream.sid)
            }, 500);
          } else {
            clearInterval(this.timer)
            console.log("获取音量失败", error.name);
          }
        }
      );
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
.progress {
  margin-top: 20px;
}
</style>
