<template>
  <Layout class="size my-frame">
    <Header>
      <div class="sys-info"><img class="logo" src="@/assets/logo.png" />{{ sysName }}</div>

      <Dropdown class="fr" @on-click="userDropClick">
        <span href="javascript:void(0)">
          欢迎您，{{ userName }}
          <Icon type="ios-arrow-down"></Icon>
        </span>
        <DropdownMenu slot="list">
          <DropdownItem name="changePass">修改密码</DropdownItem>
          <DropdownItem name="loginOut">退出登录</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Tooltip class="fr" :content="isFullscreen ? '退出全屏' : '全屏'" placement="bottom" style="margin-right: 15px">
        <Icon @click.native="handleChange" :type="isFullscreen ? 'md-contract' : 'md-expand'" :size="23"></Icon>
      </Tooltip>
      <Tooltip class="fr" content="返回首页" placement="bottom" style="margin-right: 15px">
        <Icon type="md-home" :size="23" @click="goHome" />
      </Tooltip>
      <!-- <Tooltip class="fr" content="大数据看板" placement="bottom" style="margin-right: 15px">
        <Icon type="ios-stats" :size="23" @click="bigDataBoard()" />
      </Tooltip> -->
    </Header>

    <Layout class="layout-bottom">

      <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed" class="size">
      <Menu class="scroll-bar" :accordion="true" v-show="!isCollapsed" ref="menu" theme="light" width="auto" :active-name="$route.name" :open-names='openNames'  @on-select="routeTo">
        <template v-for="item in menuList">
          <sub-menu-item :key="item.code" v-if="item.resChile && item.resChile.length !== 0" :parent-item="item"></sub-menu-item>
          <MenuItem :key="item.code" v-else :name="item.path">
            <Icon v-bind="{type:item.icon || 'md-more'}" size="20"/>
            <span :title="item.name">{{ item.name }}</span>
          </MenuItem>
        </template>
      </Menu>
      <div v-show="isCollapsed" class="collapsed-menu">
        <template v-for="item in menuList">
          <collapse-menu :key="item.code" v-if="item.resChile && item.resChile.length !== 0" @on-click="collapseClick" :parent-item="item" hide-title></collapse-menu>
          <Tooltip :key="item.code" ptip trigger="hover" v-else transfer :content="item.name" placement="right">
            <a @click="collapseClick(item.path)" class="drop-menu-a">
              <Icon v-bind="{type:item.icon || 'md-more'}" size="32"/></a>
          </Tooltip>
        </template>
      </div>
    </Sider>
      <Content>
        <div class="content-warp">
        <div class="tag-container">
          <div class="menu-slider-btu">
            <Icon @click.native="collapsedSider" class="collapsed-sider" :class="rotateIcon" type="md-menu" size="24"></Icon>
          </div>
          <div class="tag-wrap">
            <div class="tag-nav-prev" v-if="showNavBtn" @click="tagNavScroll('prev')">
              <Icon type="ios-arrow-back" />
            </div>
            <div class="tag-nav-scroll-container" ref="tagScrollContainer">
              <div class="tag-nav-scroll-wrap" ref="tagList" :style="{left: tagBodyLeft + 'px'}">
                <template v-for="(item, index) in tagList">
                  <Tag type="dot"
                    :key="index"
                    v-if="!item.hiddenInTag"
                    ref="tagsPageOpened"
                    :data-route-item="item"
                    :closable="item.name !== 'home'"
                    :color="isCurrntTag(item) ? 'primary':'default'"
                    @click.native="tagClick(item)"
                    @on-close="tagClose(item)">{{ item.meta.title }}</Tag>
                </template>
              </div>
            </div>
            <div class="tag-nav-next" v-if="showNavBtn" @click="tagNavScroll('next')">
              <Icon type="ios-arrow-forward" />
            </div>
          </div>
          <div class="close-btu-group">
            <Dropdown placement="bottom-start" @on-click="closeNav">
              <Button icon="ios-arrow-down"></Button>
              <DropdownMenu slot="list">
                  <DropdownItem name="left"><Icon class="dropdown-menu-icon" type="md-arrow-back" /> 关闭左侧</DropdownItem>
                  <DropdownItem name="right"><Icon class="dropdown-menu-icon" type="md-arrow-forward" /> 关闭右侧</DropdownItem>
                  <DropdownItem name="other"><Icon class="dropdown-menu-icon" type="md-close" /> 关闭其它</DropdownItem>
                  <DropdownItem name="all" class="dropdown-menu-icon" divided><Icon type="ios-close-circle" /> 全部关闭</DropdownItem>
              </DropdownMenu>
          </Dropdown>
          </div>
        </div>
        <div class="content-main">
        <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cacheList">
          <router-view />
        </keep-alive>
        </transition>
        </div>
      </div>
      </Content>
    </Layout>
    <!--重置密码-->
    <Modal
      v-model="showModel"
      title="修改密码"
      width="580"
      :mask-closable="false">
      <Form ref="addDepForm" class="form-content"  :label-width="110">
        <Row >
          <Col span="22">
            <FormItem label="原始密码" :required="true">
              <Input v-model.trim="passwordData.oldPassword" placeholder="请输入原始密码" type="password" :maxlength="20" :required="true"></Input>
            </FormItem>
          </Col>
           <Col span="22">
             <FormItem label="新密码" :required="true">
               <Input v-model.trim="passwordData.newPassword" placeholder="请输入8-16位大写字母、小写字母、数字与特殊符号的组合作为新密码" type="password" :maxlength="20" :required="true"></Input>
             </FormItem>
           </Col>
          <Col span="22">
            <FormItem label="确认密码" :required="true">
              <Input v-model.trim="passwordData.newTruePassword" placeholder="请输入确认密码,和新密码要一致" type="password" :maxlength="20" :required="true"></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="showModel=false">取消</Button>
        <Button type="primary" size="large" @click="save">确定</Button>
      </div>
    </Modal>
  </Layout>
</template>

<script>
import '@/assets/less/frame.less'//框架样式
import subMenuItem from './sub-menu-item'//展开的菜单层级
import collapseMenu from './collapse-menu'//收起的菜单层级
import { routeEqual,setTagNavListInLocalstorage } from '@/plugins/util'
import * as loginServer from '@/api/login.api'
export default {
  name: 'home',
  components: {
    subMenuItem,
    collapseMenu
  },
  data () {
    return {
      sysName: process.env.VUE_APP_PROJECT_NAME,//项目名称
      sysVersion: 'V1.0.0',//项目版本
      userName: "admin",
      isCollapsed: false,//是否收起侧边栏
      openNames: [],//展开的submenu的name集合
      isFullscreen: false,//是否全屏
      tagNavList: [],//tab标签列表
      tagBodyLeft: 0,//tag当前滚动的位置
      tagMarginRight: 4,//每个tag距右边的外边距
      routerArr: [],//权限路由数据
      menuList: [],
      showModel:false,
      showNavBtn: false,
      currentTag: null,
      passwordData:{
        newPassword:'',
        oldPassword:'',
        newTruePassword:''
      },
      tagList: [//tag列表
        {
          name: 'home',
          meta: {
            title: '首页'
          },
          params: {},
          query: {}
        },
      ],
    }
  },
  computed: {
    rotateIcon () {//收起侧边栏按钮图标样式
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ];
    },
    cacheList () {
      return [...this.$store.state.cacheList];
    }
  },
  methods: {
    routeTo (route) {//菜单点击
      let { name, params, query } = {}
      if (typeof route === 'string') {
        name = route
      }else {
        name = route.name
        params = route.params
        query = route.query
      }
      if(name != this.$route.name){
        this.$router.push({
          name,
          params,
          query
        })
      }
    },
    collapseClick (name) {//collapse菜单点击
      this.routeTo(name)
    },
    collapsedSider () {//侧边栏展开收起
      this.$refs.side1.toggleCollapse();
    },
    getOpenName (routePath) {//展开的submenu的name集合
      let openNameArr = routePath.split('/');
      openNameArr.shift();
      this.openNames = openNameArr;
      this.$nextTick(() => {
        this.$refs.menu.updateOpened()
      })
    },
    handleFullscreen () {
      let main = document.body
      if (this.isFullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (main.requestFullscreen) {
          main.requestFullscreen()
        } else if (main.mozRequestFullScreen) {
          main.mozRequestFullScreen()
        } else if (main.webkitRequestFullScreen) {
          main.webkitRequestFullScreen()
        } else if (main.msRequestFullscreen) {
          main.msRequestFullscreen()
        }
      }
      this.isFullscreen = !this.isFullscreen
    },
    handleChange () {
      this.handleFullscreen()
    },
    isCurrntTag (item) {//判断当前活动的tab
      return routeEqual(this.$route, item)
    },
    tagClick (item) {//tag点击
      this.routeTo(item)
    },
    changeNavBarStatus(){
      setTimeout(()=>{
        if(this.$refs && this.$refs.tagList && this.$refs.tagScrollContainer){
          if(this.$refs.tagList.clientWidth < this.$refs.tagScrollContainer.clientWidth){
            this.showNavBtn = false;
          }else{
            this.showNavBtn = true;
          }
        }
      }, 300)
    },
    tagClose (item) {//tag关闭
      item.meta.notCache = true;
      let name = item.name;
      const itemIdx = this.tagList.findIndex(item =>
        item.name === name
      )
      this.tagList.splice(itemIdx, 1)
      this.$store.commit('setCacheList', this.tagList.map(item=>item.name))
      this.changeNavBarStatus();
      if (routeEqual(item, this.$route)){//如果关闭的是当前活动tag
        if (itemIdx == this.tagList.length){//关闭tag在最后一个位置
          this.routeTo(this.tagList[itemIdx-1].name)
        }else{
          this.routeTo(this.tagList[itemIdx].name)
        }
      }else{
        setTimeout(()=>{
            this.moveToView(this.currentTag)
          },600);
          setTagNavListInLocalstorage([...this.tagList]);
      }
    },
    tagNavScroll (type) {//tag-nav前后滑动
      const tagListWidth = this.$refs.tagList.clientWidth;//tag-list的总宽度
      const scrollContainerWidth = this.$refs.tagScrollContainer.clientWidth;//滚动容器的宽度
      if(type === 'prev'){
        this.tagBodyLeft = Math.min(0, this.tagBodyLeft + scrollContainerWidth)
      }else{
        if (scrollContainerWidth < tagListWidth) {
          if (this.tagBodyLeft < -(tagListWidth - scrollContainerWidth)) {
            this.tagBodyLeft = this.tagBodyLeft
          } else {
            this.tagBodyLeft = Math.max(this.tagBodyLeft + (-scrollContainerWidth), scrollContainerWidth - tagListWidth)
          }
        } else {
          this.tagBodyLeft = 0
        }
      }
    },
    moveToView (tag) {//移动当前活动tag在可视范围内
      const outerWidth = this.$refs.tagScrollContainer.clientWidth;
      const bodyWidth = this.$refs.tagList.clientWidth;
      const tagleftX = tag.offsetWidth + tag.offsetLeft + this.tagMarginRight;
      const tagRightX = tag.offsetWidth + tag.offsetLeft + this.tagMarginRight;
      let visibleAreaBodyRight = outerWidth - this.tagBodyLeft; // 可视标签区域
      if(visibleAreaBodyRight > bodyWidth){
        visibleAreaBodyRight = bodyWidth + this.tagBodyLeft;
      }
      if (bodyWidth < outerWidth) {
        this.tagBodyLeft = 0
      } else if (tag.offsetLeft < -this.tagBodyLeft || this.$route.name == 'home') {
        // 标签在可视区域左侧
        this.tagBodyLeft = -tag.offsetLeft + this.tagMarginRight
      } else if (tag.offsetLeft > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + outerWidth) {
        // let tagRightX = tag.offsetWidth + tag.offsetLeft + this.tagMarginRight;
        // if(tagRightX > )
        // 标签在可视区域
        this.tagBodyLeft = Math.min(0, outerWidth - tag.offsetWidth - tag.offsetLeft - this.tagMarginRight)
      } else {
        // 标签在可视区域右侧
        this.tagBodyLeft = -(tag.offsetLeft - (outerWidth - this.tagMarginRight - tag.offsetWidth))
      }
    },
    getTagElementByRoute (route) {//获取当前活动tag元素
      this.$nextTick(() => {
        const tagListWidth = this.$refs.tagList.clientWidth;//tag-list的总宽度
        const scrollContainerWidth = this.$refs.tagScrollContainer.clientWidth;//滚动容器的宽度
        let isShowNavBtn = false;
        if (tagListWidth > scrollContainerWidth) {
          isShowNavBtn = true;
        }else{
          isShowNavBtn = false;
        }
        if(isShowNavBtn !== this.showNavBtn){
          this.showNavBtn = isShowNavBtn;
          this.$nextTick(() => {
            this.refsTag = this.$refs.tagsPageOpened;
            this.refsTag.forEach((item, index) => {
              if (routeEqual(route, item.$attrs['data-route-item'])) {
                let tag = this.refsTag[index].$el;
                this.currentTag = tag;
                this.moveToView(tag)
              }
            })
          })
        } else {
          this.refsTag = this.$refs.tagsPageOpened
          this.refsTag.forEach((item, index) => {
            if (routeEqual(route, item.$attrs['data-route-item'])) {
              let tag = this.refsTag[index].$el
              this.currentTag = tag;
              this.moveToView(tag)
            }
          })
        }
      })
    },
    userDropClick (type) {
      if(type == 'loginOut'){
        Storage.removeAll();
        location.href = process.env.VUE_APP_BASE_URL;
      }else if(type ==='changePass'){
        this.showModel = true;
      }
    },
    closeNav(type) {
      let currentTagIndex = -1;
      let closeNumber = 0;
      switch(type){
        case 'all':
          this.tagList = [{
            name: 'home',
            meta: {
              title: '首页'
            },
            params: {},
            query: {}
          }];
          this.tagClick(this.tagList[0]);
          break;
        case 'left':
          currentTagIndex = this.tagList.findIndex(item => item.name === this.$route.name)
          if( currentTagIndex > 1) {
            this.tagList.splice(1, currentTagIndex-1);
            this.moveToView(this.tagList[1]);
          }
          break;
        case 'right':
          currentTagIndex = this.tagList.findIndex(item => item.name === this.$route.name);
          closeNumber = this.tagList.length - 1 - currentTagIndex;
          if( closeNumber > 0) {
            this.tagList.splice(currentTagIndex + 1);
            this.moveToView(this.tagList[currentTagIndex]);
          }
          break;
        case 'other':
          currentTagIndex = this.tagList.findIndex(item => item.name === this.$route.name);
          closeNumber = this.tagList.length - 1 - currentTagIndex;
          if( closeNumber > 0) {
            this.tagList.splice(currentTagIndex + 1);
          }
          if( currentTagIndex > 1) {
            this.tagList.splice(1, currentTagIndex-1);
          }
          this.moveToView(this.tagList[1]);
          break;
      }
      this.$store.commit('setCacheList', this.tagList.map(item=>item.name))
      setTagNavListInLocalstorage([...this.tagList]);
    },
    save(){
      if(!this.passwordData.oldPassword){
        this.$Message.warning('请输入原始密码');
        return;
      }
      if(!this.passwordData.newPassword){
        this.$Message.warning('请输入新密码');
        return;
      }
      if(this.passwordData.newPassword.length<6){
        this.$Message.warning('密码格式不正确,6-20位数');
        return;
      }
      var regex = new RegExp('^.*(?=.{8,16})(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[~!@#$%^&*?\(\)]).*$');
      if(!regex.test(this.passwordData.newPassword)){
        this.$Message.warning("新密码应该由8-16位大写字母、小写字母、数字与特殊符号的组合！");
        return;
      }
      if(this.$regex.passWordReg(this.passwordData.newPassword)){
        this.$Message.warning('密码格式不正确,不能输入汉字');
        return;
      }
      if(!this.passwordData.newTruePassword){
        this.$Message.warning('请输入确认密码');
        return;
      }
      if(this.passwordData.newPassword != this.passwordData.newTruePassword){
        this.$Message.warning('请输入新密码两次输入不一致');
        return;
      }

      let param = {
        userId:Storage.get('userId'),
        oldPassword:this.passwordData.oldPassword,
        newPassword:this.passwordData.newPassword,
      }
      loginServer.sysUsersupdateUserPassword(param).then(res => {
        if(res.data.code == 200){
          this.$Message.success(res.data.msg);
          this.showModel = false;
          setTimeout(() =>{
            Storage.removeAll();
            this.routeTo('login')
          },1500);
        }else{
          this.$Message.error(res.data.msg);
        }
      })
    },
    goHome () {
      window.location.href = process.env.HOME_URL;
    },
    bigDataBoard () {
      this.routeTo('bigDataKanban')
    },
    getRouteArr (list) {//根据权限菜单得到路由
      if(list.resChile && list.resChile.length >= 1){
        list.resChile.forEach(item => {
          this.getRouteArr(item)
        })
      }else{
        this.routerArr.push(list.path)
      }
    }
  },
  mounted () {
    this.userName = Storage.get('userName');
    let manuListCache = Storage.get('menuList');
    if(manuListCache){
      this.menuList = JSON.parse(manuListCache);
    } else {
      Storage.removeAll();
      location.href = process.env.VUE_APP_BASE_URL;
    }
    
    if(this.routerArr.indexOf('home') == -1){
      this.routerArr.push('home');
    }
    this.menuList.forEach(item => {
      this.getRouteArr(item);
    });
    Storage.set("routerArr", this.routerArr);
    if(Storage.get('tagNaveList')){
      this.tagList = JSON.parse(Storage.get('tagNaveList'))
      this.$store.commit('setCacheList', this.tagList.map(item=>item.name))
      if(this.tagList.findIndex(item => item.name === this.$route.name) == -1){
        this.routeTo('home')
        setTagNavListInLocalstorage([...this.tagList]);
      }else{
        this.getOpenName(this.$route.path);
        setTimeout(() => {
          this.getTagElementByRoute(this.$route)
        }, 200)
      }
    }else{
      this.routeTo('home')
    }
  },
  watch: {
    '$route' (newRoute) {
      const { name, query, params, meta } = newRoute
      if(this.tagList.findIndex(item => item.name === name) == -1){
        // if(newRoute.matched.length > 2){
        //   const parents = newRoute.matched.filter((item, index)=>{
        //     return index > 0 && index < newRoute.matched.length -1
        //   });
        //   parents.forEach(item => {
        //     if(this.tagList.findIndex(findItem => findItem.name === item.name) == -1){
        //       this.tagList.push({ name: item.name, query: item.query, params: item.params, meta: item.meta, hiddenInTag:  true});
        //     }
        //   });
        // }
        this.tagList.push({ name, query, params, meta });
        this.$store.commit('setCacheList', this.tagList.map(item=>item.name))
        setTagNavListInLocalstorage([...this.tagList]);
      }
      this.getTagElementByRoute(newRoute);
      this.getOpenName(newRoute.path);
    }
  },
}
</script>

<style lang="less" scoped>
  .dropdown-menu-icon {
    .ivu-icon{
      font-size: 16px;
      // vertical-align: middle;
    }
  }
  .ivu-tag{
    cursor: pointer;
  }
</style>
