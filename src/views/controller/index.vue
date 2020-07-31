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
      <el-table-column align="center" label="控制器编号" width="150">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="控制器名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="ip地址" width="300" align="center">
        <template slot-scope="scope">
          {{ scope.row.ip }}
        </template>
      </el-table-column>
      <el-table-column label="tcpPort" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.tcpPort }}
        </template>
      </el-table-column>
      <!--      <el-table-column label="lastUpdate" width="250" align="center">-->
      <!--        <template slot-scope="scope">-->
      <!--          {{ scope.row.humanReadableLastUpdate }}-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column class-name="status-col" label="状态" width="200" align="center">
        <template slot-scope="scope">
          <el-tag :type="statusItem[scope.row.status]">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="所辖交换机数量" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.deviceNum }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit="listQuery.size" @pagination="fetchData" />

  </div>
</template>

<script>
import { getList } from '@/api/table'
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
        type: undefined
      },
      statusItem: {
        READY: 'warning',
        ACTIVE: 'success',
        ERROR: 'error'
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    getList,
    fetchData() {
      this.listLoading = true
      const query = {
        size: this.listQuery.size || '',
        page: this.listQuery.page || ''
      }
      getList(query).then(response => {
        this.list = response.data.nodes
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>
