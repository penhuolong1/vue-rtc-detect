# rtc-test
> 检测摄像头, 麦克风, 喇叭是否正常

## 安装
``` bash
$ npm install vue-rtc-detect
```
## 使用
```js
<template>
  <div id="app">
    <RtcDetect ref="rtcDetect" audioSrc="{{测试喇叭所用的音频文件}}"/>
  </div>
</template>

<script>
import RtcDetect from 'vue-rtc-detect'
import 'vue-tag-textarea/lib/vue-tag-textarea.css'

export default {
  name: 'App',
  components: {
    RtcDetect
  },
  created() {
  },
  mounted() {
    this.$refs.rtcDetect.init()
  }
}
</script>
```

## 参数
```
audioSrc 测试喇叭所用的音频文件 下载下来的依赖包下面会有一个test.wav的音频文件 把这个文件放在自己服务器上然后把地址赋值给audioSrc

```

## 方法
```
init() 打开模态框 初始化插件
```

## 依赖
依赖于 element-ui urtc-sdk

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
