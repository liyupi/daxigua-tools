import JsZip from 'jszip'
import {saveAs} from 'file-saver'

export class DownloadUtil {
  constructor() {
    this.zip = new JsZip();
  }

  // 添加文件到zip
  addFileInZip(fileName, content, option) {
    this.zip.file(fileName, content, option)
  }

  // 添加文件夹到zip
  addFolderInZip(folderName) {
    return this.zip.folder(folderName)
  }

  // 打包成blob（二进制数据）
  packageZip2blob() {
    return this.zip.generateAsync({type: 'blob'})
  }

  // 打包并下载(默认打包成blob)
  packageZipAndDownload(zipName, type = 'blob') {
    this.zip.generateAsync({type}).then(content => {
      saveAs(content, zipName)
    })
  }
}
