<template>
  <div class="root">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item >首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统设置</el-breadcrumb-item>
        <el-breadcrumb-item>系统配置</el-breadcrumb-item>
        <el-breadcrumb-item>配置管理</el-breadcrumb-item>
        </el-breadcrumb>
        <br>
        <!-- 查询条件 -->
        配置项类型:
        <el-select @change="handleCurrentChange(1)" clearable v-model="searchDTOByPaging.original.type" placeholder="请选择类型">
            <el-option v-for="(type,index) in configTypes" :key="index" :label="changeConcigType(type)" :value="type"></el-option>
        </el-select>
        <!-- 添加配置项按钮 -->
        <br>
        <!-- 表数据 -->
        <el-table stripe  
                :data="resultByPaging.data.dataArray"
                style="width: 100%">
        <!-- checkbox -->
        <!-- <el-table-column
            type="selection"
            width="55">
        </el-table-column> -->
        <!-- 系统ID -->
        <el-table-column sortable
            prop="configId"
            label="ID"
            width="60">
        </el-table-column>
        <!-- 名称 -->
        <el-table-column
            prop="name"
            label="名称"
            width="120">
        </el-table-column>
        <!-- 类型 -->
        <el-table-column
            prop="type"
            label="类型"
            width="100">
        </el-table-column>
        <!-- 更新时间 -->
        <el-table-column
            prop="updateTime"
            label="更新时间"
            width="100">
        </el-table-column>
        <!-- 描述 -->
        <el-table-column
            prop="description"
            label="描述"
            width="180">
        </el-table-column>
        <!-- 此配置项的对应值 -->
        <el-table-column
            prop="value"
            label="此配置项的对应值"
            >
            <template slot-scope="scope">
                <el-input 
                autosize
                type="textarea"
                :rows="2"
                placeholder="请输入此配置项的值"
                v-model="scope.row.value" @blur="saveConfig(scope.row)">
                </el-input>
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
        return {
            // 分页查询参数
            searchDTOByPaging:{
                currentPage:1,
                pageSize:10,
                total:0,
                original:{}
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
            // 存在的配置类型 
            configTypes:[],
            // 配置类型对应的中文
            configTypeNameMap:[
                {name:'应用初始化',value:'app_init'},
                {name:'下载',value:'download'},
                {name:'缓存',value:'cache'},
                {name:'磁盘文件',value:'disk_file'},
                {name:'阿里云对象存储',value:'aliyun_oss'},
            ],
        }
    },
    created(){
        this.getConfigByPaging()
    },
    methods: {
        // 测试方法
        test(){alert('test')},
        // 切换标签页
        handleClick(tab, event) {
            //console.log(tab, event);
        },
        // 分页查询配置数据
        async getConfigByPaging(){
            const {data: res} = await this.$http.post(`/api/config/list/paging`,this.searchDTOByPaging)
            //console.log(res)
            if(res.status.code !== 200) return this.$message.error('后台接口异常，分页查询配置数据失败！返回信息：'+res.message)
            //else this.$message.success(res.message)

            // 给分页查询结果赋值
            this.resultByPaging = res

            // 更新查询参数
            this.searchDTOByPaging.currentPage = this.resultByPaging.data.currentPage
            this.searchDTOByPaging.pageSize = this.resultByPaging.data.pageSize
            this.searchDTOByPaging.total = this.resultByPaging.data.total

            // 如果存在的配置类型不存在 初始化给存在的配置类型赋值 并去重
            if(this.configTypes.length != 0) return
            var configTypesTempVar = []
            this.resultByPaging.data.dataArray.forEach(element => {
                configTypesTempVar.push(element.type)
            });
            this.configTypes = Array.from(new Set(configTypesTempVar))
        },
        // 转化配置类型显示值为中文
        changeConcigType(value){
            var name = ''
            this.configTypeNameMap.forEach(e => {
                if(e.value == value) name = e.name
            });
            return name
        },
        // 分页-每页显示条数改变
        handleSizeChange(val){
            this.searchDTOByPaging.pageSize = val
            this.getConfigByPaging()
        },
        // 分页-当前页改变
        handleCurrentChange(val){
            this.searchDTOByPaging.currentPage = val
            this.getConfigByPaging()
        },
        // 保存或更新配置项
        async saveConfig(config){
            const {data: res} = await this.$http.put(`/api/config/save`,config)
            //console.log(res)
            if(res.status.code !== 201) return this.$message.error('后台接口异常，保存或更新配置项失败，返回信息：'+res.message)
            else this.$message.success(res.message)
            this.getConfigByPaging()
        },
    }
}
</script>

<style lang="less" scoped>
.root{
    // border:black 1px solid;
}
</style>>