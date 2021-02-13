<template>
  <div class="root">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item >首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>知识专栏</el-breadcrumb-item>
      <el-breadcrumb-item>撰写专栏</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    {{column}}
    <br>
    <div class="column-header">
      <el-input style="width:60%" v-model="column.title" placeholder="请输入专栏标题"></el-input>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-select v-model="column.category" clearable placeholder="请选择专栏分类">
        <el-option
          v-for="(category,index) in columnCategorys"
          :key="index"
          :label="category"
          :value="category">
        </el-option>
      </el-select>
      <div class="column-sumbit">
        <el-button plain>发布</el-button>
        <el-button plain>草稿</el-button>
      </div>
    </div>
    <div class="column-content">
      <mavon-editor style="max-height:1500px;min-height:650px;" v-model="column.content" placeholder="请开始您的创作"/>
    </div>
    <el-select v-model="column.tags" style="width:90%" multiple placeholder="请选择专栏标签">
      <el-option
        v-for="(tag,index) in columnTags"
        :key="index"
        :label="tag"
        :value="tag">
      </el-option>
    </el-select>

    <div class="column-sumbit">
      <el-button plain>发布</el-button>
      <el-button plain>草稿</el-button>
    </div>

  </div>
</template>

<script>
export default {
  data(){
    return{
      // 专栏
      column:{
        title: '',
        content: ''
      },
      // 专栏的所有分类
      columnCategorys:[
        '分类一','分类二'
      ],
      // 专栏的所有标签
      columnTags:[
        '标签一','标签二'
      ],

    }
  },
  mounted () {
    
  },
}
</script>
<style lang="less" scoped>
// 提交按钮
.column-sumbit{
  float: right;
}
// 专栏内容
.column-content{
  margin: 10px 0;
}

// 专栏头部
.column-header{
  margin: 10px 0;
}
</style>