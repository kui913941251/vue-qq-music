<template>
  <div id="home">
    <nav-bar :navs="navs" :active="activeNav" @change="changeActive"></nav-bar>
    <search-input />
    <audio ref="audio" src="" controls></audio>
  </div>
</template>

<script>
import NavBar from "@/components/common/navBar/NavBar"
import SearchInput from "@/components/common/searchInput/SearchInput"

import Api from "@/httpClient"

export default {
  name: "Home",
  components: {
    NavBar,
    SearchInput
  },
  data() {
    return {
      navs: [
        {
          name: "推荐",
        },
        {
          name: "音乐馆"
        },
        {
          name: "电台"
        },
        {
          name: "播客"
        }
      ],
      activeNav: ""
    }
  },
  async created() {
    this.activeNav = this.navs[0].name
    let songUrl = await Api.getSongUrl({songmid:"0047RMg02FndTg"})
    this.$refs.audio.src = songUrl
  },
  methods: {
    changeActive(name) {
      this.activeNav = name
    }
  }
}
</script>

<style lang="scss" scoped>

</style>