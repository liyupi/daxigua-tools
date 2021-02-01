<template>
  <div class="pic-uploader">
    <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-change="handleAvatarSuccess"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
  export default {
    name: 'PicUploader',
    props: ['width', 'height', 'onChange'],
    components: {},
    data() {
      return {
        imageUrl: '',
      }
    },
    methods: {
      async handleAvatarSuccess(file) {
        let res = await this.beforeAvatarUpload(file.raw)
        if (!res) {
          return;
        }
        this.imageUrl = URL.createObjectURL(file.raw);
        if (this.onChange) {
          this.onChange(file.raw);
        }
      },
      beforeAvatarUpload(file) {
        const isPNG = file.type === 'image/png';

        if (!isPNG) {
          this.$message.error('上传的图片只能是 PNG 格式!');
          return false;
        }

        if (!this.width && !this.height) {
          return true;
        }

        const that = this;

        const isSize = new Promise(function (resolve, reject) {
          let _URL = window.URL || window.webkitURL;
          let image = new Image();
          image.onload = () => {
            let valid = true;
            if (that.width && image.width !== that.width) {
              valid = false;
            }
            if (that.height && image.height !== that.height) {
              valid = false;
            }
            return valid ? resolve() : reject();
          };
          image.src = _URL.createObjectURL(file);
        }).then(
          () => true,
          () => {
            this.$message.error(`图片尺寸不符,只能是 ${this.width} * ${this.height}`);
            return false;
          }
        );

        return isPNG && isSize;
      }
    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
