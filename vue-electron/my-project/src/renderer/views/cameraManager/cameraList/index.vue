<template>
	<div class="app-container">
		<div class="filter-container">
			<el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="名称" size="small" v-model="listQuery.title">
			</el-input>
			<el-input @keyup.enter.native="handleFilter" style="width: 200px;margin-left: 10px;" class="filter-item" placeholder="序列号" size="small" v-model="listQuery.serial_number">
			</el-input>
			<el-select v-model="listQuery.manufactor" placeholder="厂家" clearable style="width: 200px;margin-left: 10px;" class="filter-item" size="small">
				<el-option v-for="item in manufactorList" :key="item.id" :label="item.name" :value="item.id" />
			</el-select>
			<el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter" size="small" style="margin-left: 10px;">搜索</el-button>
			<el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" size="small" @click="handleCreate">添加</el-button>
		</div>
		<el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;" @sort-change="sortChange">
			<el-table-column label="编号" sortable="custom" align="center" prop="id">
				<template slot-scope="scope">
					<span>{{ scope.row.id}}</span>
				</template>
			</el-table-column>
			<el-table-column label="名称" sortable="custom" align="center" prop="title">
				<template slot-scope="scope">
					<span>{{ scope.row.title }}</span>
				</template>
			</el-table-column>
			<el-table-column label="序列号" sortable="custom" align="center" prop="serial_number">
				<template slot-scope="scope">
					<span>{{ scope.row.serial_number }}</span>
				</template>
			</el-table-column>
			<el-table-column label="状态" sortable="custom" align="center" prop="status">
				<template slot-scope="scope">
					<el-switch v-model="scope.row.status" active-text="正常" inactive-text="停用" :active-value="0" :inactive-value="1" @click.native="changStaus(scope.row,'change_status')" disabled>
					</el-switch>
				</template>
			</el-table-column>
			<el-table-column label="保密性" sortable="custom" align="center" prop="is_private">
				<template slot-scope="scope">
					<el-switch v-model="scope.row.is_private" active-text="私有" inactive-text="公开" :active-value="1" :inactive-value="0" @click.native="changStaus(scope.row,'change_private')" disabled>
					</el-switch>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center" class-name="small-padding fixed-width">
				<template slot-scope="scope">
					<el-button type="success" size="mini" @click="showCameraAuthorityDialog(scope.row)">权限</el-button>
					<el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="550px">
			<el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
				<el-form-item label="序列号" prop="serial_number">
					<el-input v-model="temp.serial_number" />
				</el-form-item>
				<el-form-item label="名称">
					<el-input v-model="temp.title" />
				</el-form-item>
				<el-form-item label="厂家" prop="manufactor">
					<el-select v-model="temp.manufactor" placeholder="厂家" clearable style="width: 200px;" size="small">
						<el-option v-for="item in manufactorList" :key="item.id" :label="item.name" :value="item.id" />
					</el-select>
				</el-form-item>
				<el-form-item label="状态">
					<el-switch v-model="temp.status" active-text="正常" inactive-text="停用" :active-value="0" :inactive-value="1">
					</el-switch>
				</el-form-item>
				<el-form-item label="保密性">
					<el-switch v-model="temp.is_private" active-text="私有" inactive-text="公开" :active-value="1" :inactive-value="0">
					</el-switch>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取消</el-button>
				<el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确定</el-button>
			</div>
		</el-dialog>
			
		<el-dialog title="权限" :visible.sync="dialogCameraVisible" width="800px" :data-obj = "cameraData">
			<camera-authority :show-camera="true" :data-obj="cameraData" ref="cameraAuthority"></camera-authority>
		</el-dialog>
	</div>
</template>

<script>
	import { getCameraList,addCamera,updateCamera,deleteCamera} from '@/api/getCameraList'
	import { getManufactorList } from '@/api/getManufactorList'
	import waves from '@/directive/waves' // 水波纹指令
	import CameraAuthority from '@/views/cameraManager/cameraAuthority'
	import Pagination from '@/components/Pagination'
	
	export default {
		name: "cameraList",
		components: {
			Pagination,
			CameraAuthority
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
					title: '',
					serial_number: '',
					manufactor: undefined
				},
				textMap: {
					update: '编辑',
					create: '新建'
				},
				dialogFormVisible: false,
				dialogStatus: 'create',
				rules: {
					serial_number: [{
						required: true,
						message: '请输入序列号',
						trigger: 'blur'
					}],
					manufactor: [{
						required: true,
						message: '请选择厂家',
						trigger: 'change'
					}]
				},
				temp: {
					serial_number: '',
					manufactor: undefined,
					title: '',
					status: 0,
					is_private: 1
				},
				manufactorList: [],
				dialogCameraVisible:false,
				cameraData:{}
			}
		},
		created() {
			this.fetchData();
			getManufactorList({
				status: 0
			}).then(response => {
				this.manufactorList = response.data.manufactor_list.data;
			});
		},
		methods: {
			fetchData() {
				this.listLoading = true
				getCameraList(this.listQuery).then(response => {
					this.list = response.data.camera_device_list.data;
					this.list.forEach(function(val,index){
						val.status = parseInt(val.status);
						val.is_private = parseInt(val.is_private);
					})
					this.total = response.data.camera_device_list.total;
					this.listLoading = false
				})

			},
			handleFilter() {
				this.listQuery.page = 1;
				this.fetchData();
			},
			resetTemp() {
				this.temp = {
					serial_number: '',
					manufactor: undefined,
					title: '',
					status: 0,
					is_private: 1
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
						addCamera(this.temp).then((res)=>{
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
				this.temp = Object.assign({}, row)
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
						updateCamera(tempData,this.temp.serial_number).then(() => {
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
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
			      confirmButtonText: '确定',
			      cancelButtonText: '取消',
			      type: 'warning'
			    }).then(() => {
			    	deleteCamera(row.serial_number).then(res=>{
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
			changStaus(row,operate){
				let message,tempData = Object.assign({}, row);
				if(operate === 'change_status'){
					tempData.status = Number(!tempData.status);
					message = '此操作将改变状态, 是否继续?';
				}else{
					tempData.is_private = Number(!tempData.is_private);
					message = '此操作将改变保密性状态, 是否继续?';
				}
				this.$confirm(message, '提示', {
			      confirmButtonText: '确定',
			      cancelButtonText: '取消',
			      type: 'warning'
			    }).then(() => {
			    	updateCamera(tempData,row.serial_number).then(()=>{
			    		if(operate === 'change_status'){
			    			row.status = Number(!row.status);	
			    		}else{
			    			row.is_private = Number(!row.is_private);
			    		}
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
			showCameraAuthorityDialog(row){
				let obj = {};
				obj["id"] = row.id;
				obj["title"] = row.title;
				obj["serial_number"] = row.serial_number;
				this.cameraData = obj;
				this.dialogCameraVisible = true;
				this.$nextTick(() => {
					this.$refs['cameraAuthority'].fetchData()
				})
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