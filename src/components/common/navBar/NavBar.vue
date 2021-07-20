<template>
  <div class="nav-bar">
    <ul>
      <li v-for="nav in navs" 
          :key="nav.name" 
          :class="{active: nav.name === active}" @click="handleChangeActive(nav.name)">
        <span>{{nav.name}}</span>
        <div class="line"></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    navs: {
      type: Array
    },
    active: {
      type: String
    }
  },
  data() {
    return {

    }
  },
  methods: {
    handleChangeActive(name) {
      this.$emit("change", name)
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-bar {
  padding: 0 $common-padding;
  height: $nav-height;
  ul {
    display: flex;
    align-items: center;
    height: 100%;
    li {
      position: relative;
      margin: 2px 10px;
      line-height: 100%;
      transition: .3s;
      &.active {
        font-size: 18px;
        font-weight: 600;
        transition: .3s;
        .line {
          transition: .3s;
          width: 80%;
        }
      }
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
      .line {
        position: absolute;
        left: 50%;
        bottom: -8px;
        transform: translateX(-50%);
        width: 0;
        height: 3px;
        background-color: $them-color;
        transition: .3s;
      }
    }
  }
}
</style>