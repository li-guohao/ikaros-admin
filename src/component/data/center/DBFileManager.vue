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
    <el-select @change="handleCurrentChange(1)" clearable  v-model="searchDTOByPaging.original.place" placeholder="请选择储存位置">
        <el-option
        v-for="place in dbFilePlaceArr"
        :key="place.id"
        :label="place.name"
        :value="place.value">
        </el-option>
    </el-select>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <el-input style="width:45%" @change="handleCurrentChange(1)" placeholder="请输入文件路径模糊查询" v-model="searchDTOByPaging.original.webUrl" clearable></el-input>
    <!-- 文件展示框 -->
    <el-dialog
        :title="fileEntity.originalName"
        :visible.sync="fileInfoDialogVisible"
        width="60%">
    <div align="center">
        <!-- 文件描述  -->
        <p>{{fileEntity.description}}</p>
        <!-- 图片文件 -->
        <div v-if="imgSuffixArray.indexOf(fileEntity.suffix) >=0">
            <a :href="fileEntity.webUrl" target="_blank">
                <img :src="fileEntity.webUrl" :alt="fileEntity.description" width="100%" />
            </a>
        </div>
        <!-- 视频文件 -->
        <div v-else-if="videoSuffixArray.indexOf(fileEntity.suffix) >=0">
            <video :src="fileEntity.webUrl" controls width="100%" preload="none" >
                您的浏览器不支持HTML5的video标签
            </video>
        </div>
        
        <!-- 音频文件 -->
        <div v-else-if="voiceSuffixArray.indexOf(fileEntity.suffix) >=0">
            <audio :src="fileEntity.webUrl" controls="controls">
            </audio>
        </div>

        <!-- 其它类型 -->
        <div v-else>
            <p>不支持预览的文件类型</p>
        </div>
    </div>
    </el-dialog>
    
    <!-- 数据区域 -->
    <el-table stripe  @row-dblclick="showFile" @before-close="fileEntity = {}"
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
    <!-- 储存位置 -->
    <el-table-column
        prop="place"
        label="储存位置"
        width="80">
    </el-table-column>
    <!-- 更新时间 -->
    <el-table-column
        prop="uploadTime"
        label="更新时间"
        width="165px">
    </el-table-column>
    <!-- 描述 -->
    <el-table-column
        prop="description"
        label="描述">
        <template slot-scope="scope">
            <el-input 
            autosize
            type="textarea"
            :rows="2"
            placeholder="请输入此文件记录的描述"
            v-model="scope.row.description" @blur="saveEntity(scope.row)">
            </el-input>
        </template>
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
            <el-button @click="showFile(scope.row)">详情</el-button>
            <el-button @click="deleteEntity(scope.row)">删除</el-button>
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
            // 文件储存的所有位置
            dbFilePlaceArr:[
                {id:0,name:'本地',value:'local'},
                {id:1,name:'阿里云OSS',value:'aliyun_oss'},
                {id:2,name:'腾讯云COS',value:'tencent_cloud_cos'},
            ],
            // 文件展示框是否显示
            fileInfoDialogVisible: false,
            // 文件详情
            fileEntity:{},
            // 图片后缀
            imgSuffixArray:["bmp","bpg","png","jpg","jpeg","gif"],
            // 视频后缀
            videoSuffixArray:["mp4","mov","avi","flv","wmv","mkv"],
            // 音频后缀
            voiceSuffixArray:["mp3","flac"],
            // 文档后缀
            docSuffixArray:["pdf","doc","docx","ppt","txt","yaml","properties","yml","xml"],
            
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
        // 显示文件详情
        showFile(dbFile){
            // console.log(dbFile)
            this.fileEntity = dbFile
            this.fileInfoDialogVisible = true
        },
        // 文件展示框关闭之前的钩子事件
        beforeFileInfoDialogClose(down){
            console.log(down)
        },
        // 保存或更新
        async saveEntity(dbfile){
            const {data: res} = await this.$http.put(`/api/dbfile/one/save`,dbfile)
            //console.log(res)
            if(res.status.code !== 201) return this.$message.error('后台接口异常，保存或更新失败，返回信息：'+res.message)
            else this.$message.success(res.message)
            this.getListByPaging()
        },
        // 删除
        async deleteEntity(dbfile){
            // 再次确认
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(async () => {
                // 请求后台，删除文件
                const {data:res} = await this.$http.delete(`/api/dbfile/one/`+dbfile.fileId)
                if(res.status.code!=200) this.$message.error(res.message)
                else this.$message.success(res.message)
                this.getListByPaging()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
    }
}
</script>

<style lang="less" scoped>
.root{


}
</style>