<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="server" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text red-text">
            内存使用率
          </div>
          <count-to :start-val="0" :end-val="memper" :decimals="2" :duration="3000" class="card-panel-num red-text" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            在线控制器数量
          </div>
          <count-to :start-val="0" :end-val="controllernum" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="switch1" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text red-text">
            交换机在线率
          </div>
          <count-to :start-val="0" :end-val="switchper" :decimals="2" :duration="3000" class="card-panel-num red-text" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            在线交换机数量
          </div>
          <count-to :start-val="0" :end-val="switchnum" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="camera1" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text red-text">
            摄像头在线率
          </div>
          <count-to :start-val="0" :end-val="cameranum" :decimals="2" :duration="3000" class="card-panel-num red-text" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            在线摄像头数量
          </div>
          <count-to :start-val="0" :end-val="cameraper" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            用户数量
          </div>
          <count-to :start-val="0" :end-val="usernum" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getStaticData } from '@/api/table'
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  data: () => ({
    controllernum: 0,
    switchnum: 0,
    cameranum: 0,
    usernum: 0,
    memper: 0,
    switchper: 0,
    cameraper: 0,
    cameras: []
  }),
  created() {
    this.getData()
  },
  methods: {
    getData() {
      getStaticData().then(response => {
        const { controllernum, switchnum, cameranum, usernum, memper, switchper, cameraper } = response.data
        this.controllernum = controllernum || 0
        this.switchnum = switchnum || 0
        this.cameranum = cameranum || 0
        this.usernum = usernum || 0
        this.memper = memper || 0
        this.switchper = switchper || 0
        this.cameraper = cameraper || 0
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .panel-group {
    margin-top: 18px;

    .card-panel-col {
      margin-bottom: 32px;
    }

    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);

      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }

        .icon-people {
          background: #40c9c6;
        }

        .icon-message {
          background: #36a3f7;
        }

        .icon-money {
          background: #f4516c;
        }

        .icon-shopping {
          background: #34bfa3
        }
      }

      .icon-people {
        color: #40c9c6;
      }

      .icon-message {
        color: #36a3f7;
      }

      .icon-money {
        color: #f4516c;
      }

      .icon-shopping {
        color: #34bfa3
      }

      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }

      .card-panel-icon {
        float: left;
        font-size: 48px;
      }

      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;

        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }

        .red-text{
          color: #0091EA;
        }

        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }

  @media (max-width:550px) {
    .card-panel-description {
      display: none;
    }

    .card-panel-icon-wrapper {
      float: none !important;
      width: 100%;
      height: 100%;
      margin: 0 !important;

      .svg-icon {
        display: block;
        margin: 14px auto !important;
        float: none !important;
      }
    }
  }
</style>
