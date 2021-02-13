<template>
<div class="root">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item >首页</el-breadcrumb-item>
        <el-breadcrumb-item>数据中心</el-breadcrumb-item>
        <el-breadcrumb-item>文件管理</el-breadcrumb-item>
        <el-breadcrumb-item>上传文件</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <div algin="center" style="margin: 0 15%">
        <el-upload width="60%"
        :action="dataCenterFileUploadAPIURL"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :on-error="handleError"
        :show-file-list="true"
        :on-preview="previewFile"
        multiple drag
        :file-list="fileList">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div slot="tip" class="el-upload__tip">单个文件不超过5G</div>
    </el-upload>
    </div>
    

    <!-- 文件预览区 -->
    <!-- 文件展示框 -->
    <el-dialog
        :title="fileEntity.originalName"
        :visible.sync="fileInfoDialogVisible"
        width="60%">
    <div align="center">
        <!-- 文件描述  -->
        <p>{{fileEntity.description}}</p>
        <!-- 图片文件 -->
        <div v-if="imgSuffixArray.indexOf(fileEntity.suffix) >=0">
            <a :href="fileEntity.webUrl" target="_blank">
                <img :src="fileEntity.webUrl" :alt="fileEntity.description" width="100%" />
            </a>
        </div>
        <!-- 视频文件 -->
        <div v-else-if="videoSuffixArray.indexOf(fileEntity.suffix) >=0">
            <video :src="fileEntity.webUrl" controls width="100%" preload="none" >
                您的浏览器不支持HTML5的video标签
            </video>
        </div>
        
        <!-- 音频文件 -->
        <div v-else-if="voiceSuffixArray.indexOf(fileEntity.suffix) >=0">
            <audio :src="fileEntity.webUrl" controls="controls">
            </audio>
        </div>

        <!-- 其它类型 -->
        <div v-else>
            <p>不支持预览的文件类型</p>
        </div>
    </div>
    </el-dialog>

</div>
</template>

<script>
export default {
    data() {
      return {
        // 文件列表数组
        fileList: [],
        // 文件展示框是否显示
        fileInfoDialogVisible: false,
        // 文件详情
        fileEntity:{},
        // 图片后缀
        imgSuffixArray:["bmp","bpg","png","jpg","jpeg","gif"],
        // 视频后缀
        videoSuffixArray:["mp4","mov","avi","flv","wmv","mkv"],
        // 音频后缀
        voiceSuffixArray:["mp3","flac"],
        // 文档后缀
        docSuffixArray:["pdf","doc","docx","ppt","txt","yaml","properties","yml","xml"],
      };
    },
    created(){
        // this.test()
    },
    computed:{
        dataCenterFileUploadAPIURL: function(){
            return this.$store.state.dataCenterFileUploadAPIURL
        },
    },
    methods:{
        // 测试用方法
        test(){
            alert(this.dataCenterFileUploadAPIURL)
        },
        // 移除文件
        handleRemove(file, fileList) {
            // console.log(file)
            var dbFile = file.response.data
            this.deleteEntity(dbFile)
        },
        // 请求后台移除文件
        async deleteEntity(dbfile){
            // 请求后台，删除文件
            const {data:res} = await this.$http.delete(`/api/dbfile/one/`+dbfile.fileId)
            if(res.status.code!=200) this.$message.error(res.message)
            else this.$message.success(res.message)
        },
        // 文件上传后响应
        handleSuccess(response, file, fileList){
            // console.log(response)
            if(response.status.code != 201) {
                this.$message.error(response.message)
            }
        },
        // 文件上传出错构造函数
        handleError(err, file, fileList){
            alert(err)
        },
        // 预览文件
        previewFile(file){
            console.log(file)
            this.fileInfoDialogVisible = true
            this.fileEntity = file.response.data
        },
    },
}
</script>

<style lang="less" scoped>

</style>