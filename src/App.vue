<template>
  <div id="app">
    <h1>合成大西瓜改图工具 1.0 - by 鱼皮</h1>
    <p class="text">
      用法：<br/>
      1. 在对应位置上传你要替换的图片，尺寸必须一致 <br/>
      2. 点击打包下载 <br/>
      3. 解压下载的压缩包，替换掉 res/raw-assets 目录 <br/>
      <a href="https://github.com/liyupi/daxigua" target="_blank" class="link">项目仓库</a>
      <a href="https://mp.weixin.qq.com/s/H9VR1MWn-9bKSC_1l_MkJw" target="_blank" class="link">文章教程</a>
      <a href="https://www.bilibili.com/video/BV1Vy4y1n7KW/" target="_blank" class="link">视频教程</a> <br/>
      作者鱼皮，鹅厂小开发，<a href="https://github.com/liyupi/daxigua" target="_blank">编程技术公众号：程序员鱼皮</a>，欢迎关注<br/>
    </p>
    <el-row :gutter="20" justify="center">
      <el-col :span="6" v-for="(item, i) in UPLOAD_LIST" :key="i">
        <div class="grid-content bg-purple item-wrapper">
          <div class="my-name">{{item.name}} {{item.width}} * {{item.height}}</div>
          <PicUploader :width="item.width" :height="item.height"
                       :onChange="file => doPicChange(item, file)" />
        </div>
      </el-col>
    </el-row>
    <br/>
    <el-button type="primary" @click="doDownload">打包下载</el-button>
  </div>
</template>

<script>
  import PicUploader from "./components/PicUploader";
  import {DownloadUtil} from "./utils/fileUtils";
  import {UPLOAD_LIST} from "./constant";
  import {ZIP_PARENT_DIR} from "./constant";

  export default {
    name: 'app',
    components: {PicUploader},
    data() {
      return {
        imageUrl: '',
        UPLOAD_LIST,
        ZIP_PARENT_DIR,
        files: {}
      }
    },
    methods: {
      // 打包下载
      doDownload() {
        const downloadUtil = new DownloadUtil();
        console.log(this.files)
        Object.keys(this.files).forEach(key => {
          const {file, filename} = this.files[key];
          if (file && filename) {
            downloadUtil.addFileInZip(filename, file);
          }
        })
        downloadUtil.packageZipAndDownload('raw-assets.zip');
      },
      doPicChange(item, file) {
        this.files[item.key] = {
          filename: `${ZIP_PARENT_DIR}/${item.fileDir}/${item.filename}`,
          file,
        }
        console.log(this.files)
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding: 25px;
  }

  .text {
    text-align: left;
    margin: 0 auto;
    margin-bottom: 50px;
    line-height: 1.8;
    display: inline-block;
  }

  .link {
    margin-right: 20px;
  }

  .item-wrapper {
    margin-bottom: 16px;
  }

  .my-name {
    margin-bottom: 16px;
  }
</style>
