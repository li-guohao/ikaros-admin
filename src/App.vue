<template>
  <div class="root">
    <router-view/>
    <!-- 尾部声明 -->
    <!-- 
      Ikaros CMS Web System ©2021 Created by <a href="https://liguohao.cn" target="_blank">liguohao</a>
    -->
  </div>
</template>

<script>

export default {
   methods: {
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint(broken) {
      console.log(broken);
    },
  },
};
</script>

<style lang="less" scoped>
// 覆盖默认a标签样式
a{
text-decoration:none;
color: #268deede;
}
// 伊卡洛斯页面布局
.ikaros-layout {
  height: 100%;

  // 头部区域
  .ikaros-layout-header{
    background-color: #fff;
    padding: 0;
  }

  
  // Ikaros Admin Logo
  .ikaros-sider-logo{
    color: #268deede;
    line-height: 60px;
    text-align: center;
    font-size: 31px;
    text-shadow: 1px 1px black,2px 2px black,
                 3px 3px black,4px 4px black, 
                 5px 5px black,6px 6px black, 
                 7px 7px black,8px 8px black;
  }

  // 面包屑
  .ikaros-layout-breadcrumb{
    margin: 16px 0;
    font-size: 20px;
  }

  // 主体内容区域
  .ikaros-layout-content{
    display: inline;
    height: auto;
  }
}
</style>