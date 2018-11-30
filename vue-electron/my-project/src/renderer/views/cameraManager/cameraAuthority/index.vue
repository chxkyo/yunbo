<template>
	<div class="app-container">
		<div class="filter-container" style="margin-bottom: 20px;" v-show="showCamera">
			<el-row>
			  <el-col :span="8"><div><strong>摄像头ID：</strong>{{dataObj.id}}</div></el-col>
			  <el-col :span="8"><div><strong>名称：</strong>{{dataObj.title}}</div></el-col>
			  <el-col :span="8"><div><strong>序列号：</strong>{{dataObj.serial_number}}</div></el-col>
			</el-row>
		</div>
		<div class="filter-container">
			<el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="id" size="small" v-model="listQuery.user_id">
			</el-input>
			<el-input @keyup.enter.native="handleFilter" style="width: 200px;margin-left: 10px;" class="filter-item" placeholder="昵称" size="small" v-model="listQuery.nickname">
			</el-input>
			<el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter" size="small" style="margin-left: 10px;">搜索</el-button>
			<el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" size="small" @click="handleCreate" v-show="showCamera">添加</el-button>
		</div>
		<el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;" @sort-change="sortChange">
			<el-table-column label="用户ID" sortable="custom" align="center" prop="user_id">
				<template slot-scope="scope">
					<span>{{ scope.row.user_id}}</span>
				</template>
			</el-table-column>
			<el-table-column label="昵称" sortable="custom" align="center" prop="nickname">
				<template slot-scope="scope">
					<span>{{ scope.row.nickname }}</span>
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
					<el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="550px" append-to-body top="25vh">
			<el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
				<el-form-item label="用户" prop="user_id">
					<el-select v-model="temp.user_id" placeholder="用户" clearable filterable style="width: 250px;" size="small">
						<el-option v-for="item in userList" :key="item.id" :label="item.nickname" :value="item.id" />
					</el-select>
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
	import { getList} from '@/api/userList'
	import { getCameraAuhorityList,addCameraAuhority,updateCameraAuhority,deleteCameraAuhority} from '@/api/CameraAuthority'
	import waves from '@/directive/waves' // 水波纹指令
	import Pagination from '@/components/Pagination'
	export default {
		name: "cameraAuthority",
		components: {
			Pagination
		},
		props:{
			showCamera:{
				type:Boolean,
				default:false
			},
			dataObj:{
				type:Object,
				default:function () {
					return {}
				}
			}
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
					user_id:undefined,
					nickname:undefined
				},
				textMap: {
					update: '编辑',
					create: '新建'
				},
				dialogFormVisible: false,
				dialogStatus: 'create',
				rules: {
					user_id: [{
						required: true,
						message: '请选择添加的用户',
						trigger: 'change'
					}]
				},
				temp: {
					user_id:undefined
				},
				userList:[]
			}
		},
		created() {
			this.fetchData();
		},
		methods: {
			fetchData() {
				this.listLoading = true
				if(this.showCamera){
					this.listQuery.camera_id = this.dataObj.id;
				}
				getCameraAuhorityList(this.listQuery).then(response => {
					this.list = response.data.cameras_has_users_list.data
					this.list.forEach(function(val,index){
						val.status = parseInt(val.status);
					})
					this.total = response.data.cameras_has_users_list.total;
					this.listLoading = false
				})

			},
			handleFilter() {
				this.listQuery.page = 1;
				this.fetchData();
			},
			resetTemp() {
			},
			handleCreate() {
				this.resetTemp();
				this.dialogStatus = 'create';
				getList({page:1,limit:1000}).then(res=>{
					this.userList = res.data.user_list.data;
				});
				this.dialogFormVisible = true;
				this.$nextTick(() => {
					this.$refs['dataForm'].clearValidate()
				})
			},
			createData() {
				this.$refs['dataForm'].validate((valid) => {
					if(valid) {
						this.temp.camera_id = this.dataObj.id;
						addCameraAuhority(this.temp).then((res) => {
							if(res.code === 200) {
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
						updateCamera(tempData, this.temp.serial_number).then(() => {
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
					deleteCameraAuhority(row.id).then(res => {
						this.$notify({
							title: '成功',
							message: '删除成功',
							type: 'success',
							duration: 2000
						})
						this.fetchData();
					}).catch(() => {

					})
				}).catch(() => {});
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
			changStaus(row) {
				let message, tempData = Object.assign({}, row);
				tempData.status = Number(!tempData.status);
				message = '此操作将改变状态, 是否继续?';
				this.$confirm(message, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					updateCameraAuhority(tempData, row.id).then(() => {
						row.status = Number(!row.status);
						this.$notify({
							title: '成功',
							message: '操作成功',
							type: 'success',
							duration: 2000
						})
					})
				}).catch(() => {});
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