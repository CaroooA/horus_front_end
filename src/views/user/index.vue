<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="用户列表" name="list" class="tabs">
        <el-table
          v-loading="listLoading"
          :data="list"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
        >
          <el-table-column align="center" label="用户编号" width="95">
            <template slot-scope="scope">
              {{ scope.row.id }}
            </template>
          </el-table-column>
          <el-table-column label="名称" align="center">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column class-name="status-col" label="部门" width="400" align="center">
            <template slot-scope="scope">
              {{ scope.row.department }}
            </template>
          </el-table-column>
          <el-table-column class-name="status-col" label="角色" width="200" align="center">
            <template slot-scope="scope">
              {{ scope.row.role }}
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
      <el-tab-pane label="添加用户" name="add" class="tabs">
        <el-form ref="form" :model="addForm" :rules="rules" label-width="120px" style="max-width: 800px">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="addForm.name" placeholder="请输入用户姓名" />
          </el-form-item>
          <el-form-item label="部门" prop="department">
            <el-input v-model="addForm.department" placeholder="请输入所属部门" />
          </el-form-item>
          <el-form-item label="摄像头" prop="role">
            <el-select v-model="addForm.role" placeholder="请选择" style="width: 100%">
              <el-option key="user" value="用户" label="用户" />
              <el-option key="admin" value="管理员" label="管理员" />
            </el-select>
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
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入用户姓名" />
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="form.department" placeholder="请输入所属部门" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="form.role" placeholder="请选择" style="width: 100%">
            <el-option key="user" value="user" label="用户" />
            <el-option key="admin" value="admin" label="管理员" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="submitLoading" @click="editSubmit">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, addUser, editUser, userDelete } from '@/api/table'
import Pagination from '@/components/Pagination'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      form: {
        name: '',
        role: '',
        department: ''
      },
      addForm: {
        name: '',
        role: '',
        department: ''
      },
      activeName: 'list',
      list: null,
      listLoading: true,
      rules: {
        role: [
          { required: true, message: '请输入选择用户角色', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请填写用户姓名', trigger: 'change' }
        ],
        department: [
          { required: true, message: '请填写所属单位', trigger: 'change' }
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
    getUserList,
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
      getUserList(query).then(response => {
        this.total = response.data.total
        this.list = response.data.users
        this.listLoading = false
      })
    },
    edit(item) {
      this.dialogVisible = true
      const { role, name, department } = item
      this.form = {
        name: name || '',
        role: role || '',
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

