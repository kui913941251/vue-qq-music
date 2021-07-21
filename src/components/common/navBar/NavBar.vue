<template>
  <div class="nav-bar">
    <ul>
      <li
        v-for="nav in navs"
        :key="nav.name"
        :class="{ active: nav.name === active }"
        @click="handleChangeActive(nav.name)"
      >
        <span>{{ nav.name }}</span>
      </li>
      <div class="line"></div>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    navs: {
      type: Array,
    },
    active: {
      type: String,
    },
  },
  data() {
    return {};
  },
  watch: {
    active() {
      this.$nextTick(() => {
        this.handleSetWidth();
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.handleSetWidth();
    });
  },
  methods: {
    // 更改选中
    handleChangeActive(name) {
      this.$emit("change", name);
    },
    // 设置底部线的长度
    handleSetWidth() {
      // 点击的元素
      let target = document.querySelector(".nav-bar .active span");
      // 获取长度
      let width = target.offsetWidth;
      // 设置线的长度
      let line = document.querySelector(".nav-bar .line");
      line.style.width = width + "px";
      line.style.left = target.offsetLeft + "px";
      target.style.left = target.offsetLeft + "px";
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-bar {
  padding: 0 $common-padding;
  height: $nav-height;
  ul {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    li {
      margin: 2px 10px;
      line-height: 100%;
      /* transition: 0.3s; */
      &.active {
        font-size: 18px;
        font-weight: 600;
        /* transition: 0.3s; */
      }
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
    }
    .line {
      position: absolute;
      left: 0px;
      bottom: 4px;
      width: 0px;
      height: 3px;
      background-color: $them-color;
      transition: 0.3s;
    }
  }
}
</style>
