<template>
  <div class="content-height scroll-bar">
    <div class="welcome-container">
    <div class="tip-box">
      <img src="../assets/img/welcome-bg.png" class="tip__image" />
      <div class="tip__title">点击左侧菜单栏，开始工作</div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return{

    }
  }
}
</script>

<style lang="less" scoped>
.welcome-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #fff;
  .tip-box {
    margin-bottom: 100px;
    .tip__image {
      margin-bottom: 30px;
      margin-left: 57px;
    }
    .tip__title {
      font-size: 16px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 22px;
    }
  }
}
</style>
