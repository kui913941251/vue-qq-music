<template>
  <div class="player-full" :class="{ show: playerFullVisible }" ref="playerFull">
    <div class="mask">
      <img :src="cover" />
    </div>
    <div class="header">
      <div class="back-icon" @click="handleHidden">
        <i class="iconfont icon-xiala"></i>
      </div>
      <div class="top-tab">
        <span @click="handleChangePannel('main')">歌曲</span>
        <span class="separator">|</span>
        <span @click="handleChangePannel('lyric')">歌词</span>
      </div>
    </div>
    <div class="main">
      <template>
        <PlayerFullMainPannel v-show="currentPannel === 'main'" />
      </template>
      <template>
        <PlayerFullLyricPannel v-show="currentPannel === 'lyric'" />
      </template>
    </div>
  </div>
</template>

<script>
import PlayerFullMainPannel from './PlayerFullMainPannel.vue'
import PlayerFullLyricPannel from './PlayerFullLyricPannel.vue'
export default {
  name: 'PlayerFull',
  components: {
    PlayerFullMainPannel,
    PlayerFullLyricPannel,
  },
  data() {
    return {
      currentPannel: 'main',
    }
  },
  computed: {
    playerFullVisible() {
      return this.$store.state.player.playerFullVisible
    },
    cover() {
      return this.$store.state.player.currentSong.cover
    },
  },
  methods: {
    handleChangePannel(pannel) {
      this.currentPannel = pannel
    },
    handleHidden() {
      this.$store.commit('changePlayerFullVisible', false)
    },
  },
}
</script>

<style lang="scss" scoped>
.player-full {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  transform: translateY(100%);
  transition: $transition-time-base;
  overflow: hidden;
  &.show {
    transform: translateY(0);
    transition: $transition-time-base;
    transition-delay: $transition-time-base;
  }
  .mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
    filter: blur(50px);
    transform: scale(2.5);
    img {
      width: 100%;
      height: 100%;
    }
  }
  .header {
    text-align: center;
    padding: 0 10px;
    height: 50px;
    line-height: 50px;
    color: #fff;
    .back-icon {
      float: left;
    }
    .top-tab {
      font-size: 15px;
      .separator {
        margin: 0 5px;
      }
    }
  }
  .main {
    height: calc(100% - 50px);
  }
}
</style>
