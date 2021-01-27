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
        &nbsp;&nbsp;&nbsp;&nbsp;
        <!-- 添加配置项按钮 -->
        <el-button icon="el-icon-plus" @click="addDialogFormVisible = true" circle></el-button>
        <!-- 添加配置对话框 -->
        <el-dialog title="添加配置项" :visible.sync="addDialogFormVisible">
            <el-form :model="configItem">
                <el-form-item label="类型" >
                    <el-input v-model="configItem.type" placeholder="配置项类型" ></el-input>
                </el-form-item>
                <el-form-item label="名称" >
                    <el-input v-model="configItem.name" placeholder="配置项名称" ></el-input>
                </el-form-item>
                <el-form-item label="描述" >
                    <el-input v-model="configItem.description"  
                        placeholder="请输入此配置项的简述"></el-input>
                </el-form-item>
                <el-form-item label="配置项的值" >
                    <el-input 
                        autosize
                        type="textarea"
                        :rows="2"
                        placeholder="请输入此配置项的值"
                        v-model="configItem.value" >
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addConfig">保存</el-button>
            </div>
        </el-dialog>

        
        <br>
        <!-- 表数据 -->
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
            // 添加配置项 对话框是否显示
            addDialogFormVisible: false,
            // 待添加的配置项
            configItem:{}
        }
    },
    created(){
        this.getConfigByPaging()
        this.getConfigTypes()
        this.showHint()
    },
    methods: {
        // 测试方法
        test(){alert('test')},
        // 分页查询配置数据
        async getConfigByPaging(){
            const {data: res} = await this.$http.post(`/api/config/list/paging`,this.searchDTOByPaging)
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
        // 查询所有的配置类型
        async getConfigTypes(){
             const {data: res} = await this.$http.get(`/api/config/types`)
            //console.log(res)
            if(res.status.code !== 200 &&  res.status.code !== 404) return this.$message.error('后台接口异常，查询所有配置项失败！返回信息：'+res.message)
            //else this.$message.success(res.message)
            
            this.configTypes = Array.from(new Set(res.data))
        },
        // 转化配置类型显示值为中文
        changeConcigType(value){
            var name = ''
            this.configTypeNameMap.forEach(e => {
                if(e.value == value) {
                    name = e.name
                }
            });
            return name==''?value:name
        },
        // 分页-每页显示条数改变
        handleSizeChange(val){
            this.searchDTOByPaging.pageSize = val
            this.getConfigByPaging()
            this.getConfigTypes()
        },
        // 分页-当前页改变
        handleCurrentChange(val){
            this.searchDTOByPaging.currentPage = val
            this.getConfigByPaging()
            this.getConfigTypes()
        },
        // 保存或更新配置项
        async saveConfig(config){
            const {data: res} = await this.$http.put(`/api/config/one/save`,config)
            //console.log(res)
            if(res.status.code !== 201) return this.$message.error('后台接口异常，保存或更新配置项失败，返回信息：'+res.message)
            else this.$message.success(res.message)
            this.getConfigByPaging()
            this.getConfigTypes()
        },
        // 新增配置项
        async addConfig(){
            this.saveConfig(this.configItem)
            this.addDialogFormVisible = false
        },
        // 删除当前配置项
        async deleteCurrentConfigItem(configItem){
            // 再次确认
            this.$confirm('此操作将永久删除该配置项, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(async () => {
                // 请求后台，删除配置项
                const {data:res} = await this.$http.delete(`/api/config/one/`+configItem.configId)
                if(res.status.code!=200) this.$message.error(res.message)
                else this.$message.success(res.message)
                this.getConfigByPaging()
                this.getConfigTypes()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        // 温馨提示
        showHint(){
            this.$notify({
                title: '温馨提示',
                message: '不清楚的配置项请不要随意修改',
                duration: 10000,
                type: 'warning'
            });
        }
    }
}
</script>

<style lang="less" scoped>
.root{
    // border:black 1px solid;
    display: inline;
}
</style>>