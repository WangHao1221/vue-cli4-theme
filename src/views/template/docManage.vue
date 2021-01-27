<template>
  <div class="content-height scroll-bar">
    <!-- 列表模块 -->
    <div class="list-box-warp">
      <div class="panel-wrap list-bar-box">
        <div class="panel-title clearfix">
          <Icon type="md-grid" size="20" />行业选择
        </div>
      </div>
      <div class="list" key="list">
        <div class="layout-warp">
          文档管理页面
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as loginService from '@/api/login.api'

export default {
  name: "docManage",
  data() {
    return {
      
    };
  },
  methods: {
    
  },
  destroyed(){
  },
  mounted() {
    // loginService.sysUsersfindUserRes().then(res=>{

    // }).catch(err=>{

    // })
  }
};
</script>

<style lang="less" scoped>
</style>
