<template>
  <div class="tab-bar">
    <ul>
      <li v-for="tab in tabs" :key="tab.path" 
          :class="{'active': activePath === tab.path}"
          @click="handleChangePath(tab.path)">
        <div><i :class="tab.iconfont"></i></div>
        <span>{{tab.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import routerPath from "@/router/routes/routePath"
 
export default {
  name: "TabBar",
  data() {
    return {  
      activePath: "",
      tabs: [
        {
          path: routerPath.HOME,
          iconfont: "iconfont icon-yinle",
          name: "首页"
        },
        {
          path: routerPath.VIDEO,
          iconfont: "iconfont icon-shipin",
          name: "视频"
        },
        {
          path: routerPath.COMMUNITY,
          iconfont: "iconfont icon-shequ",
          name: "扑通"
        },
        {
          path: routerPath.PROFILE,
          iconfont: "iconfont icon-wode",
          name: "我的"
        }
      ]
    }
  },
  
  created() {
    this.activePath = this.tabs[0].path
  },

  methods: {
    handleChangePath(path) {
      this.activePath = path
      this.$router.push(path)
    }
  }
  
}
</script>

<style lang="scss" scoped>
.tab-bar {
  height: $tab-height;
  padding: 3px 0;
  ul {
    height: 100%;
    display: flex;
    li {
      flex: 1;
      text-align: center;
      color: #8a8a8a;
      i {
        font-size: 25px;
      }
      span {
        font-size: 12px;
        vertical-align: top;
      }
    }
    .active {
      color: $them-color;
    }
  }
}
</style>