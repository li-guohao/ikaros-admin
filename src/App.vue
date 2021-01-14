<template>
  <!-- <div class="root">
    <router-view/>
  </div> -->
  <a-layout class="ikaros-layout">
    <!-- 左边LOGO和导航栏 -->
    <a-layout-sider
      breakpoint="lg"
      collapsed-width="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
    >
      <!-- Ikaros Admin Logo -->
      <div class="ikaros-sider-logo">
        <a href="#">
          <span>Ikaros-Admin</span>
        </a>
      </div>
      <!-- 左侧导航栏 -->
      <a-menu theme="dark" mode="inline" :default-selected-keys="['4']">
        <a-menu-item key="1">
          <a-icon type="user" />
          <span class="nav-text">nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="video-camera" />
          <span class="nav-text">nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="upload" />
          <span class="nav-text">nav 3</span>
        </a-menu-item>
        <a-menu-item key="4">
          <a-icon type="user" />
          <span class="nav-text">nav 4</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    
    <!-- 右边 -->
    <a-layout>
      <!-- 头部 -->
      <a-layout-header class="ikaros-layout-header">
          这是ikaros头部区域
      </a-layout-header>

      <a-layout style="padding: 0 24px 24px">
        <!-- 面包屑导航 -->
        <a-breadcrumb  class="ikaros-layout-breadcrumb">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <!-- 主体内容 -->
        <a-layout-content class="ikaros-layout-content">
          <a-card style="width: 300px;display:inline;">
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            Content
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
          </a-card>
          
        </a-layout-content>
      </a-layout>
      <!-- 尾部声明 -->
      <!-- <a-layout-footer style="textAlign: center">
        Ikaros CMS Web System ©2021 Created by <a href="https://liguohao.cn" target="_blank">liguohao</a>
      </a-layout-footer> -->
    </a-layout>
  </a-layout>
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
    // background-color: #fff;
    display: inline;
    // padding: 24px;
    // margin: 5px;
    // min-height: 280px;
    height: auto;
  }
}
</style>