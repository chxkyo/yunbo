<template>
  <div class="app-container">
		<div class="filter-container">
			<el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="邮箱" v-model="listQuery.email" size="small">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;margin-left: 10px;" class="filter-item" placeholder="昵称" v-model="listQuery.nickname" size="small">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter" size="small" style="margin-left: 10px;">搜索</el-button>
      <!--<el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" size="small" @click="handleCreate">添加</el-button>-->
		</div>
		<el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
      >
      <el-table-column label="编号" sortable="custom" align="center" prop="id">
        <template slot-scope="scope">
          <span>{{ scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" sortable="custom" align="center" prop="email">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="昵称" sortable="custom" align="center" prop="nickname">
        <template slot-scope="scope">
        	<span>{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态"  sortable="custom" align="center" prop="status">
        <template slot-scope="scope">
          <el-switch
					  v-model="scope.row.status"
					  active-text="正常" inactive-text="停用"
					  :active-value="0" :inactive-value="1" @click.native="changStaus(scope.row)" disabled>
					</el-switch>
        </template>
      </el-table-column>
      <el-table-column label="登录后台" sortable="custom" align="center" prop="login_admin">
        <template slot-scope="scope">
          <el-switch
					  v-model="scope.row.login_admin"
					  active-text="允许" inactive-text="禁止"
					  :active-value="1" :inactive-value="0" @click.native="changLoginAdmin(scope.row)" disabled>
					</el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
   	<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="550px">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="编号" prop="No">
					<el-input v-model="temp.No"/>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="temp.email"/>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="temp.nickname"/>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
					  v-model="temp.status"
					  active-text="开启"
						active-value="1" inactive-value="0">
					</el-switch>
        </el-form-item>
        <el-form-item label="登录后台">
          <el-switch
					  v-model="temp.isLogin"
					  active-text="开启"
					   active-value="1" inactive-value="0">
					</el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getList,updateList,deleteList } from '@/api/userList'
import waves from '@/directive/waves' // 水波纹指令
import Pagination from '@/components/Pagination'
export default {
	name:"userList",
	components: { Pagination },
	directives: {
    waves
 },
  data() {
    return {
    	tableKey:0,
      list: null,
      listLoading: true,
      total: 0,
      listQuery:{
      	page:1,
      	limit: 10,
      	email:'',
      	nickname:''
      	
      },
      textMap: {
        update: '编辑',
        create: '新建'
      },
      dialogFormVisible: false,
      dialogStatus: 'create',
      rules: {
        No: [{required: true, message: '请输入编号', trigger: 'blur' }],
        email: [{ type: 'email', required: true, message: '请输入邮箱', trigger: 'blur' }],
        nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }]
      },
      temp:{
      	No:'',
        email:'',
				nickname:'',
				status:0,
        isLogin:0
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.user_list.data;
        this.list.forEach(function(val,index){
        	val.status = parseInt(val.status);
        	val.login_admin = parseInt(val.login_admin)
        })
      	this.total = response.data.user_list.total;
        this.listLoading = false
      })
		
    },
    handleFilter(){
    	this.listQuery.page = 1;
    	this.fetchData();
    },
    resetTemp() {
      this.temp = {
      	No:'',
        email:'',
				nickname:'',
				status:0,
        isLogin:0
      }
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
        		this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDelete(row) {
		  this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
	      confirmButtonText: '确定',
	      cancelButtonText: '取消',
	      type: 'warning'
	    }).then(() => {
	    	deleteList(row.uuid).then(res=>{
	    		this.$notify({
		        title: '成功',
		        message: '删除成功',
		        type: 'success',
		        duration: 2000
		      })
	    		this.fetchData();
	    	}).catch(()=>{
	    		
	    	})
	    }).catch(() => {        
	    });
    },
   	sortChange(data) {
      const { prop, order } = data
      this.listQuery.sort_by = prop;
      if(order === 'ascending'){
      	this.listQuery.sort_order = 'asc';
      }else{
      	this.listQuery.sort_order = 'desc';
      }
      this.handleFilter()
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort_by = ''
      } else {
        this.listQuery.sort = '-No'
      }
      this.handleFilter()
    },
    changStaus(row){
    	let tempData = Object.assign({}, row);
    	tempData.status = Number(!tempData.status);
    	this.$confirm('此操作将改变状态, 是否继续?', '提示', {
	      confirmButtonText: '确定',
	      cancelButtonText: '取消',
	      type: 'warning'
	    }).then(() => {
	    	updateList(tempData,row.uuid).then(()=>{
	    		row.status = Number(!row.status);
		    	this.$notify({
		        title: '成功',
		        message: '操作成功',
		        type: 'success',
		        duration: 2000
		      })
	    	})
	    }).catch(() => {        
	    });
    },
    changLoginAdmin(row){
    	let tempData = Object.assign({}, row);
    	tempData.login_admin = Number(!tempData.login_admin);
    	this.$confirm('此操作将改变登录后台状态, 是否继续?', '提示', {
	      confirmButtonText: '确定',
	      cancelButtonText: '取消',
	      type: 'warning'
	    }).then(() => {
	    	updateList(tempData,row.uuid).then(()=>{
	    		row.login_admin = Number(!row.login_admin);
		    	this.$notify({
		        title: '成功',
		        message: '操作成功',
		        type: 'success',
		        duration: 2000
		      })
	    	})
	    }).catch(() => {        
	    });
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
	.app-container{
		.el-input--small .el-input__inner{
			height: auto;	
		}
		.el-switch.is-disabled .el-switch__core,.el-switch.is-disabled .el-switch__label{
			cursor: pointer;
		}
	}
</style>