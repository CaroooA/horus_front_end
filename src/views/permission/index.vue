<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="权限列表" name="list" class="tabs">
        <el-table
          v-loading="listLoading"
          :data="list"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
        >
          <el-table-column align="center" label="权限编号" width="95">
            <template slot-scope="scope">
              {{ scope.row.id }}
            </template>
          </el-table-column>
          <el-table-column class-name="status-col" label="部门" width="400" align="center">
            <template slot-scope="scope">
              {{ scope.row.department }}
            </template>
          </el-table-column>
          <el-table-column class-name="status-col" label="摄像头" align="center">
            <template slot-scope="scope">
              {{ scope.row.camera }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="操作" width="250">
            <template slot-scope="{row}">
              <el-button
                type="primary"
                size="small"
                icon="el-icon-edit"
                @click="edit(row)"
              >
                编辑
              </el-button>
              <el-button
                type="danger"
                size="small"
                icon="el-icon-delete"
                @click="deleteItem(row.id)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="fetchData" />
      </el-tab-pane>
      <el-tab-pane label="添加权限" name="add" class="tabs">
        <el-form ref="form" :model="addForm" :rules="rules" label-width="120px" style="max-width: 800px">
          <el-form-item label="部门" prop="department">
            <el-input v-model="addForm.department" placeholder="请输入所属部门" />
          </el-form-item>
          <el-form-item label="摄像头·" prop="department">
            <el-input v-model="addForm.camera" placeholder="请输入绑定摄像头名称" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="submitLoading" @click="onSubmit">确认</el-button>
            <el-button @click="onCancel">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" style="max-width: 800px">
        <el-form-item label="部门" prop="department">
          <el-input v-model="form.department" placeholder="请输入所属部门" />
        </el-form-item>
        <el-form-item label="摄像头" prop="camera">
          <el-input v-model="form.camera" placeholder="请输入绑定摄像头名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="submitLoading" @click="editSubmit">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { permissionList, addUser, editUser, userDelete } from '@/api/table'
import Pagination from '@/components/Pagination'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      form: {
        name: '',
        camera: '',
        department: ''
      },
      addForm: {
        name: '',
        camera: '',
        department: ''
      },
      activeName: 'list',
      list: null,
      listLoading: true,
      rules: {
        department: [
          { required: true, message: '请填写所属单位', trigger: 'change' }
        ],
        camera: [
          { required: true, message: '请填写绑定摄像头', trigger: 'change' }
        ]
      },
      submitLoading: false,
      dialogVisible: false,
      total: 0,
      listQuery: {
        page: 1,
        size: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    permissionList,
    addUser,
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitLoading = true
          addUser(this.addForm).then(response => {
            if (response.code === 200) {
              this.$message.success('添加成功！')
              this.resetForm()
            } else {
              this.$message.error('添加失败！')
              this.resetForm()
            }
          })
          this.submitLoading = false
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.$refs.form.resetFields()
    },
    onCancel() {
      this.$refs.form.resetFields()
    },
    fetchData() {
      this.listLoading = true
      const query = {
        size: this.listQuery.size || '',
        page: this.listQuery.page || ''
      }
      permissionList(query).then(response => {
        this.total = response.data.total
        this.list = response.data.auth
        this.listLoading = false
      })
    },
    edit(item) {
      this.dialogVisible = true
      const { camera, department } = item
      this.form = {
        camera: camera || '',
        department: department || ''
      }
    },
    deleteItem(id) {
      this.$confirm('确认删除？')
        .then(_ => {
          userDelete().then(response => {
            if (response.code === 20000) {
              this.$message.success('删除成功！')
              this.resetForm()
            } else {
              this.$message.error('删除失败！')
              this.resetForm()
            }
          })
        })
        .catch(_ => {})
    },
    editSubmit() {
      editUser(this.form).then(response => {
        if (response.code === 200) {
          this.$message.success('编辑成功！')
          this.resetForm()
        } else {
          this.$message.error('编辑失败！')
          this.resetForm()
        }
      })
    }
  }
}
</script>

<style scoped>
  .line{
    text-align: center;
  }
  .tabs{
    padding-top: 20px;
  }
</style>

