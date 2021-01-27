<template>
  <div class="size">
    <div>
      <Spin fix>
        <Icon type="ios-loading" size=21 class="demo-spin-icon-load"></Icon>
        <div>资源获取中，请稍等...</div>
      </Spin>
    </div>
  </div>
</template>

<script>
import * as loginServer from '@/api/login.api';

export default {
  name: 'Login',
  data () {
    return {
    }
  },
  methods : {
    // 获取菜单-后台服务
    getMenuFn(callBack) {
      let params = {
        systemCode: Storage.get('systemCode'),
        terminalCode: Storage.get('terminalCode'),
        userId: Storage.get('userId'),
        orderType: 'desc'
      }
      loginServer.getMenus(params).then(res => {
        if (res.data.code == 200) {
          const List = res.data.data;
          Storage.set('menuList', JSON.stringify(List));
          callBack();
        }else{
          this.$Message.error(res.data.msg);
        }
      })
    },
    // 获取用户信息
    newLogin(){
      this.$router.push("main");
      return;
      function UrlSearch()
        {
          var name,value;
          var str=location.href; //取得整个地址栏
          var num=str.indexOf("?")
          str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]

          var arr=str.split("&"); //各个参数放到数组里
          for(var i=0;i < arr.length;i++){
            num=arr[i].indexOf("=");
            if(num>0){
              name=arr[i].substring(0,num);
              value=arr[i].substr(num+1);
              this[name]=value;
            }
          }
        }
        Storage.removeAll();
          var urlParams = new UrlSearch();
          loginServer.getToken(urlParams.userId, urlParams.code).then((res)=>{

            if(res.data.code === 200){
              Storage.removeAll();
              Storage.set('systemCode', urlParams.systemCode);
              Storage.set('systemId',urlParams.systemId);
              Storage.set('terminalCode',urlParams.terminalCode);
              Storage.set('userId',urlParams.userId);
              let resData = res.data.data;
              if(typeof resData === 'string'){
                resData = JSON.parse(resData)
              }
              var saveToken = resData.token;
              if(saveToken.substring(0, 7) !== 'bearer '){
                saveToken = 'bearer ' + resData.token;
              }
              Storage.set('userName',resData.userName);
              Storage.set('token', window.decodeURIComponent(saveToken));
              this.getMenuFn(()=>{
                this.$router.push("main")
              });
            }else{
              this.$Message.error(res.data.msg);
            }
          }).catch((error)=>{})
    }
  },
  created () {

  },
  mounted () {
    this.newLogin();
  }
}
</script>

<style lang="less" scoped>
@keyframes ani-demo-spin {
  from { transform: rotate(0deg);}
  50%  { transform: rotate(180deg);}
  to   { transform: rotate(360deg);}
}
.demo-spin-icon-load{
  animation: ani-demo-spin 1s linear infinite;
}
</style>
