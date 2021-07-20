<template>
  <div class="search-input">
    <input type="text" @click="confirmFocus" @input="listenInputType" v-model="serchWord">
    <i class="iconfont icon-fangdajing"></i>
  </div>
</template>

<script>
import routerPath from "@/router/routes/routePath.js"
import { debounce } from "lodash"

export default {
  name: "SearchInput",
  props: {
    canSearch: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      serchWord: "123"
    }
  },
  methods: {
    confirmFocus(e) {
      console.log(e);
      if (!this.canSearch) {
        this.$router.push(routerPath.SEARCH)
      }
    },
    listenInputType() {
      this._debounceEmit()
    },
    _debounceEmit: debounce(function() {
      this.$emit("get-hint", this.serchWord)
    }, 300)
  }
}
</script>

<style lang="scss" scoped>
.search-input{
  position: relative;
  padding: 2px $common-padding;
  height: $search-input-height;
  input {
    width: 100%;
    height: calc(#{$search-input-height} - 4px);
    padding-left: 30px;
    border-radius: calc(#{$search-input-height});
    background-color: $input-bg-color;
    border: none;
    outline: none;
    color: #898a8c;
  }
  i {
    position: absolute;
    top: 50%;
    left: calc(#{$search-input-height} / 2 + 4px);
    transform: translateY(-50%);
    color: #a6a7a9;
  }
}
</style>