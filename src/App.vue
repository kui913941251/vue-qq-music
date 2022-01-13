<template>
  <div id="app" ref="app">
    <router-view />
    <bottom />
    <player-full />
    <play-list />
  </div>
</template>

<script>
import Bottom from './components/common/bottom/Bottom'
import PlayerFull from './components/common/player/PlayerFull'
import PlayList from './components/common/player/PlayList'

export default {
  name: 'App',
  components: {
    Bottom,
    PlayerFull,
    PlayList,
  },

  mounted() {
    this.$refs.app.style.height = window.innerHeight + 'px'
    let currentSong = localStorage.getItem('currentSong')
    if (currentSong) {
      this.$store.commit('changeCurrent', JSON.parse(currentSong))
    }
  },
}
</script>

<style lang="scss" scoped>
#app {
  /* height: -webkit-fill-available; */
  background-color: $background-color;
}
</style>
