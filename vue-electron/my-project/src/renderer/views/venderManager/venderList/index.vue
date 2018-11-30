<template>
	<div class="app-container">
		<div class="filter-container">
			<el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="厂家名称" size="small" v-model="listQuery.name">
			</el-input>
			<el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter" size="small" style="margin-left: 10px;">搜索</el-button>
			<el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" size="small" @click="handleCreate">添加</el-button>

		</div>
		<el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;" @sort-change="sortChange">
			<el-table-column label="编号" sortable="custom" align="center" prop="id">
				<template slot-scope="scope">
					<span>{{ scope.row.id}}</span>
				</template>
			</el-table-column>
			<el-table-column label="名称" sortable="custom" align="center" prop="name">
				<template slot-scope="scope">
					<span>{{ scope.row.name }}</span>
				</template>
			</el-table-column>
			<el-table-column label="厂家规则" sortable="custom" align="center" prop="rule">
				<template slot-scope="scope">
					<span>{{ scope.row.rule}}</span>
				</template>
			</el-table-column>
			<el-table-column label="状态" sortable="custom" align="center" prop="status">
				<template slot-scope="scope">
					<el-switch v-model="scope.row.status" active-text="正常" inactive-text="停用" :active-value="0" :inactive-value="1" @click.native="changStaus(scope.row)" disabled>
					</el-switch>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center" class-name="small-padding fixed-width">
				<template slot-scope="scope">
					<el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="550px">
			<el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
				<el-form-item label="名称" prop="name" label-width="80px">
					<el-input v-model="temp.name" />
				</el-form-item>
				<el-form-item label="厂家规则" prop="rule" label-width="80px">
					<el-input v-model="temp.rule" />
				</el-form-item>
				<el-form-item label="状态" label-width="80px">
					<el-switch v-model="temp.status" active-text="正常" inactive-text="停用" :active-value="0" :inactive-value="1">
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
	import { getManufactorList,addManufactor,updateManufactor,deleteManufactor} from '@/api/getManufactorList'
	import waves from '@/directive/waves' // 水波纹指令
	import Pagination from '@/components/Pagination'
	export default {
		name: "venderList",
		components: {
			Pagination
		},
		directives: {
			waves
		},
		data() {
			return {
				tableKey: 0,
				list: null,
				listLoading: true,
				total: 0,
				listQuery: {
					page: 1,
					limit: 10,
					name: ''
				},
				textMap: {
					update: '编辑',
					create: '新建'
				},
				dialogFormVisible: false,
				dialogStatus: 'create',
				rules: {
					name: [{
						required: true,
						message: '请输入名称',
						trigger: 'blur'
					}],
					rule: [{
						required: true,
						message: '请输入规则',
						trigger: 'blur'
					}]
				},
				temp: {
					name:'',
					rule:'',
					status:0
				}
			}
		},
		created() {
			this.fetchData();
		},
		methods: {
			fetchData() {
				this.listLoading = true
				getManufactorList(this.listQuery).then(response => {
					this.list = response.data.manufactor_list.data;
					this.list.forEach(function(val,index){
						val.status = parseInt(val.status);
					})
					this.total = response.data.manufactor_list.total;
					this.listLoading = false
				})

			},
			handleFilter() {
				this.listQuery.page = 1;
				this.fetchData();
			},
			resetTemp() {
				this.temp = {
					name:'',
					rule:'',
					status:0
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
					if(valid) {
						addManufactor(this.temp).then((res)=>{
							if(res.code === 200){
								this.dialogFormVisible = false
								this.$notify({
									title: '成功',
									message: '创建成功',
									type: 'success',
									duration: 2000
								})
								this.handleFilter();
							}

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
			updateData() {
				this.$refs['dataForm'].validate((valid) => {
					if(valid) {
						const tempData = Object.assign({}, this.temp)
						updateManufactor(tempData,this.temp.id).then(() => {
							this.dialogFormVisible = false
							this.$notify({
								title: '成功',
								message: '更新成功',
								type: 'success',
								duration: 2000
							})
							this.handleFilter();
						})
					}
				})
			},
			handleDelete(row) {
				console.log(row.id)
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
			      confirmButtonText: '确定',
			      cancelButtonText: '取消',
			      type: 'warning'
			    }).then(() => {
			    	deleteManufactor(row.id).then(res=>{
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
				const {
					prop,
					order
				} = data
				this.listQuery.sort_by = prop;
				if(order === 'ascending') {
					this.listQuery.sort_order = 'asc';
				} else {
					this.listQuery.sort_order = 'desc';
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
			    	updateManufactor(tempData,row.id).then(()=>{
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
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	.app-container{
		.el-switch.is-disabled .el-switch__core,.el-switch.is-disabled .el-switch__label{
			cursor: pointer;
		}
	}
</style>