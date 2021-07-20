<template>
  <div id="search">
    <div class="header">
      <search-input :canSearch="true" @get-hint="getSearchHint"/>
      <div class="cancle" @click="handleBack">取消</div>
    </div>
    <div class="container">
      <search-smart-box :searchHint="searchHint" @search="handleSearch" />
    </div>
  </div>
</template>

<script>
import SearchInput from "@/components/common/searchInput/SearchInput"
import SearchSmartBox from "./SearchSmartBox"

import Api from "@/httpClient"

export default {
  name: "Search",
  components: {
    SearchInput,
    SearchSmartBox
  },

  data() {
    return {
      searchHint: {},
      currentSearch: ""
    }
  },

  methods: {
    handleBack() {
      this.$router.go(-1)
    },
    async getSearchHint(keyword) {
      this.currentSearch = keyword
      if (keyword) {
        let {data: res} = await Api.getSearchHint({key: keyword})
        this.searchHint = res.data
        console.log(res);
      }else {
        this.searchHint = {}
      }
    },
    async handleSearch() {
      let {data: res} = await Api.getSearch({key: this.currentSearch, remoteplace: "txt.yqq.playlist"})
      console.log(res);
    }
  }
}
</script>

<style lang="scss" scoped>
#search {
  padding-top: 10px;
  .header {
    display: flex;
    align-items: center;
    .search-input {
      flex: 1;
      animation: .5s inputShow;
    }
    .cancle {
      padding: 0 10px;
      animation: .5s cancleShow;
    }
  }
}

@keyframes inputShow {
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes cancleShow {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>