<template>
  <Dropdown ref="dropdown" @on-click="collapseClick" trigger='hover' placement="right-start" :transfer="hideTitle" :class="hideTitle ? '' : 'collased-menu-dropdown'">
    <a href="javascript:void(0)" class="drop-menu-a" :style="{color: !hideTitle ? '#515a6e' : '#515a6e'}">
      <Icon v-if="parentItem.parentCode == -1" v-bind="{type: parentItem.icon || 'md-apps'}" size="32"/>
      <span :title="parentItem.name" v-if="!hideTitle">{{ parentItem.name }}</span>
      <Icon style="float: right;" v-if="!hideTitle" type="ios-arrow-forward" :size="20"/>
    </a>
    <DropdownMenu ref="dropdown" slot="list">
      <template v-for="item in parentItem.resChile">
        <collapse-menu v-if="item.resChile && item.resChile.length !== 0" :parent-item="item" :key="item.code"></collapse-menu>
        <DropdownItem v-else :key="item.code" :name="item.path">
          <!-- <Icon v-bind="{type:item.icon || 'ios-arrow-forward'}" size="20"/> -->
          <span :title="item.name">{{ item.name }}</span>
        </DropdownItem>
      </template>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
import { findNodeUpperByClasses } from '@/plugins/util';

export default {
  name: 'collapseMenu',
  props: {
    parentItem: {
      type: Object,
      default: () => {},
    },
    hideTitle: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {

    };
  },
  methods: {
    collapseClick(name) {
      console.log(name);
      this.$emit('on-click', name);
    },
    handleMousemove(event, children) {
      console.log(event, children);
    },
  },
  mounted() {
    const dropdown = findNodeUpperByClasses(this.$refs.dropdown.$el, ['ivu-select-dropdown', 'ivu-dropdown-transfer']);
    if (dropdown) dropdown.style.overflow = 'visible';
  },
};
</script>

<style lang="less" scoped>

</style>
