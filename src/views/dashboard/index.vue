<template>
  <div class="dashboard-editor-container">
    <panel-group />
    <div class="amap-wrapper">
      <el-amap class="amap-box" :center="cameras[1].position" :vid="'amap-vue'">
        <el-amap-marker
          v-for="(marker, index) in cameras"
          :key="index"
          top-when-click
          :position="marker.position"
          :icon="marker.status === 'online'? icon: disableIcon"
          :vid="index"
        />
      </el-amap>
    </div>
  </div>
</template>

<script>
import PanelGroup from './panelGroup'
import { getCamera } from '@/api/table'

export default {

  components: {
    PanelGroup
  },
  data: () => ({
    markers: [
      {
        position: [104.654321, 30.21515044]
      }
    ],
    cameras: [],
    icon: 'http://112.124.17.103:5000/icon?picname=marker.png',
    disableIcon: 'http://112.124.17.103:5000/icon?picname=marker_disable.png'
  }),
  created() {
    this.getData()
  },
  methods: {
    getData() {
      getCamera().then(response => {
        const { cameras } = response.data
        this.cameras = cameras || []
      })
    }
  }
}
</script>

<style scoped>
  .dashboard-editor-container {
    padding: 32px;
    height: 100%;
    background-color: rgb(240, 242, 245);
    position: relative;
  }
  .amap-wrapper {
    width: 100%;
    height: 700px;
  }
</style>

<style>
</style>
