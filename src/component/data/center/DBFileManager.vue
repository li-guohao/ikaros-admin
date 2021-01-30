<template>
  <div class="root">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item >首页</el-breadcrumb-item>
        <el-breadcrumb-item>数据中心</el-breadcrumb-item>
        <el-breadcrumb-item>文件管理</el-breadcrumb-item>
        <el-breadcrumb-item>所有文件</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <!-- 查询条件 -->
    <el-input style="width:12%" @change="handleCurrentChange(1)" placeholder="后缀名" v-model="searchDTOByPaging.original.suffix" clearable></el-input>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <el-input style="width:20%" @change="handleCurrentChange(1)" placeholder="文件名" v-model="searchDTOByPaging.original.originalName" clearable></el-input>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <el-input style="width:65%" @change="handleCurrentChange(1)" placeholder="请输入文件路径模糊查询" v-model="searchDTOByPaging.original.webUrl" clearable></el-input>
    <!-- 数据区域 -->
    <el-table stripe  @row-dblclick="deleteCurrentConfigItem"
            :data="resultByPaging.data.dataArray"
            style="width: 100%">
    <!-- checkbox -->
    <!-- <el-table-column
        type="selection"
        width="55">
    </el-table-column> -->
    <!-- 系统ID -->
    <el-table-column sortable
        prop="fileId"
        label="ID"
        width="60">
    </el-table-column>
    <!-- 文件名 -->
    <el-table-column
        prop="originalName"
        label="文件名">
    </el-table-column>
    <!-- 储存位置ss -->
    <el-table-column
        prop="place"
        label="储存位置"
        width="80">
    </el-table-column>
    <!-- 更新时间 -->
    <el-table-column
        prop="uploadTime"
        label="更新时间">
    </el-table-column>
    <!-- 描述 -->
    <el-table-column
        prop="description"
        label="描述">
    </el-table-column>
     <!-- 访问路径 -->
    <el-table-column
        prop="webUrl"
        label="访问路径">
    </el-table-column>
    <!-- 此配置项的对应值 -->
    <el-table-column
        label="操作"
        >
        <template slot-scope="scope">
            <el-button>详情</el-button>
            <el-button>删除</el-button>
        </template>
    </el-table-column>

    
    </el-table>
    
    <!-- 分页 -->
    <el-pagination background
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="searchDTOByPaging.currentPage"
    :page-sizes="[2, 5, 10, 20, 40]"
    :page-size="searchDTOByPaging.pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="searchDTOByPaging.total">
    </el-pagination>

  </div>
</template>

<script>
export default {
    data(){
        return{
            // 分页查询参数
            searchDTOByPaging:{
                currentPage:1,
                pageSize:10,
                total:0,
                original:{
                    originalName:'',    //文件名模糊查询
                    suffix:'',          //文件后缀名模糊查询
                    webUrl:''           //文件路径模糊查询
                }
            },
            // 分页查询结果
            resultByPaging:{
                data:{},        //数据
                status:{
                    name: '',   //状态名
                    code: 0,    //状态码
                    info:''     //状态详情
                },  //状态
                message:'',     //消息
                detail:'',      //细节
            },

        }
    },
    created(){
        this.getListByPaging()
    },
    methods: {
         // 测试方法
        test(){alert('test')},
        // 分页查询配置数据
        async getListByPaging(){
            const {data: res} = await this.$http.post(`/api/dbfile/list/paging`,this.searchDTOByPaging)
            //console.log(res)
            if(res.status.code !== 200 &&  res.status.code !== 404) return this.$message.error('后台接口异常，分页查询配置数据失败！返回信息：'+res.message)
            //else this.$message.success(res.message)

            // 给分页查询结果赋值
            this.resultByPaging = res

            // 更新查询参数
            this.searchDTOByPaging.currentPage = this.resultByPaging.data.currentPage
            this.searchDTOByPaging.pageSize = this.resultByPaging.data.pageSize
            this.searchDTOByPaging.total = this.resultByPaging.data.total

        },
        // 分页-每页显示条数改变
        handleSizeChange(val){
            this.searchDTOByPaging.pageSize = val
            this.getListByPaging()
        },
        // 分页-当前页改变
        handleCurrentChange(val){
            this.searchDTOByPaging.currentPage = val
            this.getListByPaging()
        },
    }
}
</script>

<style lang="less" scoped>
.root{


}
</style>