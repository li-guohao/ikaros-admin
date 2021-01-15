<template>
  <div class="root">
    <el-container>
      <el-aside :width="isCollapse ? '0' : '300px'">
        <div class="font-logo">
          Aside
        </div>
        <!-- 下拉导航栏 -->
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>导航一</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>导航二</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>导航三</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        
        <el-header>
          <el-button  icon="el-icon-menu" round @click="isCollapse=!isCollapse"></el-button>
          Header
        </el-header>

        <el-main>
          <router-view />
        </el-main>

        <el-footer>
          Footer
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
   data() {
    return {
      // 是否折叠
      isCollapse: true,
    }
  },
  created() {
   
  },
  methods: {
    
  }
};
</script>

<style lang="less" scoped>

.root{
  // 整体容器
  .el-container{
    width: 100%;
    height: auto;

    // 左边导航栏
    .el-aside{
      margin: 0;
      padding: 0;
      min-height: 980px;
      height: auto;
      background-color: rgb(238, 241, 246);

      // 字体LOGO
      .font-logo{
        line-height: 60px;
        font-size: 30px;
        text-align: center;
        background-color:   rgba(238, 241, 246, 0.76);
      }
      // 下拉菜单
      .el-menu{
        background-color: rgb(238, 241, 246);
      }

    }

    // 头部导航栏 
    .el-header{
      padding: 0;
      line-height: 50px;
      background-color:  rgba(238, 241, 246, 0.76);
      
      // 按钮
      .el-button{
        background-color:  rgba(238, 241, 246, 0.76);
      }
    }

    // 尾部声明
    .el-footer{
     text-align: center;
     font-size: 20px; 
     padding: 20px;
    }
    
      
  }

}

</style>