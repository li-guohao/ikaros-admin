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
        action="http://127.0.0.1:8888/api/dbfile/one/upload"
        :on-remove="handleRemove"
        multiple drag
        :file-list="fileList">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div slot="tip" class="el-upload__tip">单个文件不超过5G</div>
    </el-upload>
    </div>
    

</div>
</template>

<script>
export default {
    data() {
      return {
        // 文件列表数组
        fileList: [],
      };
    },
    methods:{
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
    },
}
</script>

<style lang="less" scoped>

</style>