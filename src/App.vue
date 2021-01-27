<template>
  <div class="root" >
    <el-container>
      <el-aside :width="isCollapse ? '0' : '300px'" >
        <div class="font-logo" @click="toComponents('/')">
          Ikaros-Admin
        </div>
        <!-- 下拉导航栏 -->
        <el-menu >
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-document-copy"></i>个人记录</template>
            <el-submenu index="1-1">
              <template slot="title">最近动态</template>
              <el-menu-item index="1-1-1">发布动态</el-menu-item>
              <el-menu-item index="1-1-2">动态管理</el-menu-item>
            </el-submenu>
            <el-submenu index="1-2">
              <template slot="title">知识专栏</template>
              <el-menu-item index="1-2-1">提炼专栏</el-menu-item>
              <el-menu-item index="1-2-2">专栏管理</el-menu-item>
            </el-submenu>
            <el-submenu index="1-3">
              <template slot="title">音乐收听</template>
              <el-menu-item index="1-3-1">添加歌曲</el-menu-item>
              <el-menu-item index="1-3-2">歌曲管理</el-menu-item>
              <el-menu-item index="1-3-3">构建新歌单</el-menu-item>
              <el-menu-item index="1-3-4">歌单管理</el-menu-item>
            </el-submenu>
            <el-submenu index="1-4">
              <template slot="title">视频生活</template>
              <el-menu-item index="1-4-1">发布VLOG</el-menu-item>
              <el-menu-item index="1-4-1">VLOG管理</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-folder-opened"></i>数据中心</template>
            <el-menu-item-group>
              <template slot="title">文件管理</template>
              <el-menu-item index="2-1">上传文件</el-menu-item>
              <el-menu-item index="2-2">所有文件</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title"><i class="el-icon-user-solid"></i>我的好友</template>
            <el-menu-item-group>
              <template slot="title">好友管理</template>
              <el-menu-item index="3-1">添加好友</el-menu-item>
              <el-menu-item index="3-2">同意请求</el-menu-item>
              <el-menu-item index="3-3">所有好友</el-menu-item>
              <el-menu-item index="3-3">好友权限</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title"><i class="el-icon-setting"></i>系统设置</template>
            <el-menu-item-group>
              <template slot="title">个人中心</template>
              <el-menu-item index="4-1">个人资料</el-menu-item>
              <el-menu-item index="4-2">账号绑定</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="系统配置">
              <el-menu-item index="4-3" @click="toComponents('/system/option/config/manager')">配置管理</el-menu-item>
              <el-menu-item index="4-4" @click="toComponents('/system/option/frined/links')">友情链接</el-menu-item>
              <el-menu-item index="4-5" @click="toComponents('/system/option/index/nav')">首页导航</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        
        <el-header>
          <el-button  icon="el-icon-menu" round @click="isCollapse=!isCollapse"></el-button>
          <font>伊卡洛斯后台管理界面</font>
          <!-- <a href="/logout" style="float:right;margin: 0 5px;">登出</a> -->
          <el-button @click="toComponents('/logout')" style="float:right;line-height:30px;"  round >登出</el-button>
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
      // 是否折叠，默认折叠
      isCollapse: true,
      // 当前路由路径
      currentRouterPath: null,
    }
  },
  created() {

  },
  methods: {
    // 路由导航 为了防止JS报错，只有当当前路由路径与目标路径不一致才进行路由跳转
    toComponents(e){
      var url = window.location.href                        // http://localhost:8080/logout
      url = url.substring(url.indexOf('://')+3)             // localhost:8080/logout
      const relativePath = url.substring(url.indexOf('/'))  // /logout
      this.currentRouterPath = relativePath;
      if(e != this.currentRouterPath) {                     // 判断目标路径和当前路径是否相同
        console.log("router to ==> " + e)
        this.currentRouterPath = e
        this.$router.push(e)
      }else{
        this.$message.warning('已经在当前路径了 => '+window.location.href)
      }
    },
    // 测试用事件
    test(e){
      console.log(e)
    }
  }
};
</script>

<style lang="less" scoped>
// 更改a标签默认样式
a{
  text-decoration: none;
}

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
      .font-logo:hover,.font-logo:focus{
        background-color:  rgba(88, 85, 85, 0.281);
        color: rgb(240, 233, 233);
        transition: all 0.8s ease-in-out; /* 缓慢变化效果 */
        cursor: pointer;
      }

      // 下拉菜单
      .el-menu{
        background-color: rgb(238, 241, 246);

        a{
          color: #303133;
        }
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