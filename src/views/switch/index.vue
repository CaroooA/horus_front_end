<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="交换机编号" width="150">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="dpid" width="300">
        <template slot-scope="scope">
          {{ scope.row.dpid }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="所属控制器" width="250">
        <template slot-scope="scope">
          {{ scope.row.master }}
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center">
        <template slot-scope="scope">
          {{ scope.row.type }}
        </template>
      </el-table-column>
      <el-table-column label="版本" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.version }}
        </template>
      </el-table-column>
      <el-table-column label="协议" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.protocol }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="200" align="center">
        <template slot-scope="scope">
          <el-tag :type="statusItem[scope.row.status]">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="所辖摄像头数量" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.cameranum }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="fetchData" />

  </div>
</template>

<script>
import { getSwichList } from '@/api/table'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  components: { Pagination },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        size: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      statusItem: {
        ACTIVE: 'success',
        ERROR: 'error'
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    getSwichList,
    fetchData() {
      this.listLoading = true
      const query = {
        size: this.listQuery.size || '',
        page: this.listQuery.page || ''
      }
      getSwichList(query).then(response => {
        this.list = response.data.devices
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>
