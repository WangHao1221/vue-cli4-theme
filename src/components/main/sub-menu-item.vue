<template>
  <Submenu :name='parentItem.path'>
    <template slot="title">
      <Icon v-bind="{type:parentItem.icon || 'md-apps'}" size="20"/>
      <span :title="parentItem.name">{{ parentItem.name }}</span>
    </template>
    <template v-for="item in parentItem.resChile">
      <sub-menu-item v-if="item.resChile && item.resChile.length !== 0" :parent-item="item" :key="item.code"></sub-menu-item>
      <MenuItem v-else :name="item.path" :key="item.code">
        <Icon v-bind="{type:item.icon || 'ios-arrow-forward'}" size="20"/>
        <span :title="item.name">{{ item.name }}</span>
      </MenuItem>
    </template>
  </Submenu>
</template>

<script>
export default {
  name: 'subMenuItem',
  props: {
    parentItem: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
