<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="摄像头列表" name="list" class="tabs">
        <el-table
          v-loading="listLoading"
          :data="list"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
        >
          <el-table-column align="center" label="摄像头编号" width="95">
            <template slot-scope="scope">
              {{ scope.row.id }}
            </template>
          </el-table-column>
          <el-table-column label="摄像头名称" align="center">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column label="类型" width="250" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column label="IP" width="250" align="center">
            <template slot-scope="scope">
              {{ scope.row.ip }}
            </template>
          </el-table-column>
          <el-table-column class-name="status-col" label="经纬度" width="400" align="center">
            <template slot-scope="scope">
              {{ '[' + scope.row.longitude + ',' + scope.row.latitude + ']' }}
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

      <el-tab-pane label="添加摄像头" name="add" class="tabs">
        <el-form ref="form" :model="addForm" :rules="rules" label-width="120px" style="max-width: 800px">
          <el-form-item label="摄像头名称" prop="name">
            <el-input v-model="addForm.name" placeholder="请输入摄像头名称" />
          </el-form-item>
          <el-form-item label="摄像头分类" prop="type">
            <el-select v-model="addForm.type" placeholder="请选择摄像头分类" style="width: 100%">
              <el-option label="枪机" value="gun" />
              <el-option label="球机" value="ball" />
              <el-option label="半球机" value="halfBall" />
            </el-select>
          </el-form-item>
          <el-form-item label="摄像头经纬度" required>
            <el-col :span="11">
              <el-input v-model="addForm.longitude" placeholder="经度" style="width: 100%;" />
            </el-col>
            <el-col :span="2" class="line">-</el-col>
            <el-col :span="11">
              <el-input v-model="addForm.latitude" placeholder="纬度" style="width: 100%;" />
            </el-col>
          </el-form-item>
          <el-form-item label="IP" label-width="120px" prop="ip">
            <el-input v-model="addForm.ip" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="submitLoading" @click="onSubmit">确认</el-button>
            <el-button @click="resetAddForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" style="max-width: 800px; padding-right: 20px">
        <el-form-item label="摄像头名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入摄像头名称" />
        </el-form-item>
        <el-form-item label="摄像头分类" prop="type">
          <el-select v-model="form.type" placeholder="请选择摄像头分类">
            <el-option label="枪机" value="gun" />
            <el-option label="球机" value="ball" />
            <el-option label="半球机" value="halfBall" />
          </el-select>
        </el-form-item>
        <el-form-item label="摄像头经纬度" required>
          <el-col :span="11">
            <el-input v-model="form.longitude" placeholder="经度" style="width: 100%;" />
          </el-col>
          <el-col :span="2" class="line">-</el-col>
          <el-col :span="11">
            <el-input v-model="form.latitude" placeholder="纬度" style="width: 100%;" />
          </el-col>
        </el-form-item>
        <el-form-item label="IP" label-width="120px" prop="ip">
          <el-input v-model="form.ip" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="submitLoading" @click="editSubmit">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { cameraList, submitCamera, cameraEdit, cameraDelete } from '@/api/table'
import Pagination from '@/components/Pagination'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      form: {
        name: '',
        longitude: '',
        latitude: '',
        type: '',
        ip: ''
      },
      addForm: {
        name: '',
        longitude: '',
        latitude: '',
        type: '',
        ip: ''
      },
      activeName: 'list',
      list: null,
      listLoading: true,
      rules: {
        name: [
          { required: true, message: '请输入摄像头名称', trigger: 'blur' }
        ],
        longitude: [
          { required: true, message: '请填写经度', trigger: 'change' }
        ],
        latitude: [
          { required: true, message: '请填写纬度', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择摄像头类型', trigger: 'change' }
        ],
        ip: [
          { required: true, message: '请填写IP地址', trigger: 'blur' }
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
    cameraList,
    submitCamera,
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitLoading = true
          submitCamera(this.addForm).then(response => {
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
    editSubmit() {
      cameraEdit(this.form).then(response => {
        if (response.code === 200) {
          this.$message.success('编辑成功！')
          this.resetForm()
        } else {
          this.$message.error('编辑失败！')
          this.resetForm()
        }
      })
    },
    resetForm() {
      this.form = {
        name: '',
        longitude: '',
        latitude: '',
        type: '',
        ip: ''
      }
      this.$refs.form.resetFields()
    },
    resetAddForm() {
      this.addForm = {
        name: '',
        longitude: '',
        latitude: '',
        type: '',
        ip: ''
      }
      this.$refs.form.resetFields()
    },
    fetchData() {
      this.listLoading = true
      const query = {
        size: this.listQuery.size || '',
        page: this.listQuery.page || ''
      }
      cameraList(query).then(response => {
        this.total = response.data.total || 0
        this.list = response.data.cameras || []
        this.listLoading = false
      })
    },
    edit(item) {
      this.dialogVisible = true
      const { ip, latitude, longitude, name, type } = item
      this.form = {
        name: name || '',
        longitude: longitude || '',
        latitude: latitude || '',
        type: type || '',
        ip: ip || ''
      }
    },
    deleteItem(id) {
      this.$confirm('确认删除？')
        .then(_ => {
          cameraDelete(id).then(response => {
            if (response.code === 200) {
              this.$message.success('删除成功！')
              this.resetForm()
            } else {
              this.$message.error('删除失败！')
              this.resetForm()
            }
          })
        })
        .catch(_ => {})
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

