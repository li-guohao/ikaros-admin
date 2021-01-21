<template>
  <div class="root">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item >首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统设置</el-breadcrumb-item>
        <el-breadcrumb-item>系统配置</el-breadcrumb-item>
        <el-breadcrumb-item>配置管理</el-breadcrumb-item>
      </el-breadcrumb>
      <br>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
export default {
    data(){
        return {
            activeName: 'first'
        }
    },
    methods: {
        // 切换标签页
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
}
</script>

<style lang="less" scoped>
.root{
    // border:black 1px solid;
}
</style>>