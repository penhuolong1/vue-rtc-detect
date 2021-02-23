<template>
  <div>
    <el-dialog
      title="检测"
      :visible.sync="dialogVisible"
      width="80%"
      class="test-modal"
      :before-close="handleClose">
      <div>
        <el-steps :active="active" align-center>
          <el-step title="摄像头检测"></el-step>
          <el-step title="扬声器检测"></el-step>
          <el-step title="麦克风检测"></el-step>
          <el-step title="检测结果"></el-step>
        </el-steps>
        <div class="content">
          <CameraTest :deviceList="videoDeviceList" v-if="active == 0"></CameraTest>
          <SpeakerTest :deviceList="audioInputDeviceList" v-if="active == 1" :audioSrc="audioSrc"></SpeakerTest>
          <MicTest :deviceList="audioOutputDeviceList" v-if="active == 2"></MicTest>
          <Result :resultList="resultList" v-if="active == 3"></Result>
        </div>
      </div>
      <span v-show="active != 3" slot="footer" class="dialog-footer">
        <div class="dialog-footer-left" @click="next(1)">{{active != 1 ? '可以看到' : '可以听到'}}</div>
        <div class="dialog-footer-right" @click="next(2)">{{active != 1 ? '看不到' : '听不到'}}</div>
      </span>
      <span v-show="active == 3" slot="footer" @click="end" class="dialog-footer dialog-footer1">
        {{isSuccess ? '关闭':'重新检测'}}
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CameraTest from './cameraTest'
import SpeakerTest from './speakerTest'
import MicTest from './micTest'
import Result from './result'
import SDK from "urtc-sdk";
const { isSupportWebRTC, getDevices } = SDK;
const deviceType = {
  AUDIOINPUT: {
    type: "audioinput",
    des: "音频输入",
  }, //音频输入
  AUDIOOUTPUT: {
    type: "audiooutput",
    des: "音频输出",
  }, //音频输出
  VIDEOINPUT: {
    type: "videoinput",
    des: "视频输入",
  }, //视频输入
};
export default {
  name: 'rtcDetect',
  data () {
    return {
      dialogVisible: false,
      active: 0,
      audioInputDeviceList: [],
      audioOutputDeviceList: [],
      videoDeviceList: [],
      resultList: [] // 结果数组
    };
  },
  props: {
    audioSrc: { // 测试音频的地址
      type: String,
      default: ''
    }
  },
  components: {
    CameraTest,
    SpeakerTest,
    MicTest,
    Result
  },
  created () {
  },
  computed: {
    isSuccess() { // 是否检测成功
      return this.resultList.findIndex(item => item.result == 2) === -1
    }
  },
  mounted () {

  },
  methods: {
    // 结束
    end() {
      if (this.isSuccess) { // 成功则关闭模态框 失败就重新检测
        this.dialogVisible = false
      } else {
        this.init()
      }
    },
    // 初始化
    init() {
      this.dialogVisible = true
      this.resultList = []
      this.active = 0
      if (!isSupportWebRTC()) {
        this.$message.error('当前浏览器不支持RTC推流，建议更换Safari 或 Chrome 重试')
      } else {
        getDevices((MediaDeviceInfos) => {
          console.log("解决授权问题",MediaDeviceInfos)
        })
      }
      this.getDevicesList()
    },
    // 下一步
    next(type) {
      const project = {
        0: '摄像头',
        1: '扬声器',
        2: '麦克风'
      }
      this.resultList.push({
        project: project[this.active],
        result: type
      })
      console.log(this.resultList)
      this.active ++
    },
    handleClose() {
      this.dialogVisible = false
    },
    getDevicesList() {
      this.audioInputDeviceList = []
      this.audioOutputDeviceList = []
      this.videoDeviceList = []
      getDevices(
        (MediaDeviceInfos) => {
          console.log("MediaDeviceInfos", MediaDeviceInfos)
          for (let index = 0; index < MediaDeviceInfos.length; index++) {
            const element = MediaDeviceInfos[index];
            // 音频输入
            if (element.kind === deviceType.AUDIOINPUT.type) {
              this.audioInputDeviceList.push(element);
            }
            // 音频输出
            if (element.kind === deviceType.AUDIOOUTPUT.type) {
              this.audioOutputDeviceList.push(element);
            }
            // 视频输入
            if (element.kind === deviceType.VIDEOINPUT.type) {
              this.videoDeviceList.push(element);
            }
          }
          console.log(
            "getDevicesList success",
            this.audioInputDeviceList,
            this.audioOutputDeviceList,
            this.videoDeviceList
          );
        },
        (error) => {
          console.log("getDevicesList fail", error);
          this.$message.error(error);
        }
      );
    }
  }
};
</script>

<style>
.el-message {
  z-index: 9999!important;
}

.title>span {
  margin-right: 10px;
}
.text-wrapper {
  width: 200px;
}
.text-wrapper .title {
  font-size: 14px;
  color: #366bee;
  padding-bottom: 11px;
}
.text-wrapper .text {
  color: #333;
  line-height: 20px;
  font-size: 12px;
  margin: 0;
}
.text-wrapper .ps {
  color: #666;
  font-size: 12px;
  line-height: 17px;
  margin: 0;
  box-sizing: border-box;
  margin-top: 20px;
}
.test-modal .el-dialog{
  max-width: 600px
}
.dialog-footer {
  display: flex;
}
.dialog-footer .dialog-footer-left,.dialog-footer-right {
  flex: 1;
  height: 48px;
  line-height: 48px;
  cursor: pointer;
  text-align: center;
  font-size: 16px;
}
.dialog-footer1 {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 48px;
  line-height: 48px;
  cursor: pointer;
  text-align: center;
  font-size: 16px;
  background-color: #366bee;
  color: #fff;
}
.dialog-footer .dialog-footer-left {
  background-color: #366bee;
  color: #fff;
}
.dialog-footer .dialog-footer-right {
  background-color: #eee;
  color: #666;
}
.test-modal .el-dialog__footer {
  padding: 0px;
}
</style>
<style scoped>
</style>
