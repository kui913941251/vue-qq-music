<template>
  <div class="player-mini" @click="showPlayerFull">
    <div class="container">
      <div class="song-cover">
        <img :src="cover">
      </div>
      <div class="song-list"></div>
      <div class="song-title">
        <span>稻香-纠结伦</span>
      </div>
      <div class="play-button" @click.stop="">
        <i v-if="!playingStatus" class="iconfont icon-bofang2" @click="handlePlay"></i>
        <i v-else class="iconfont icon-zanting-copy" @click="handlePause"></i>
      </div>
      <div class="play-list" @click.stop="">
        <i class="iconfont icon-bofangliebiao1" @click="handleShowPlayList"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerMini",

  data() {
    return {
    }
  },

  computed: {
    playingStatus() {
      return this.$store.state.player.isPlaying
    },
    cover() {
      return this.$store.state.player.currentSong.cover
    }
  },

  methods: {
    showPlayerFull() {
      this.$store.commit("changePlayerFullVisible", true)
    },
    handlePlay() {
      this.$store.commit("changePlayStatus")
    },
    handlePause() {
      this.$store.commit("changePlayStatus")
    },
    handleShowPlayList() {
      this.$store.commit("changePlayListVisible", true)
      console.log(this.$store.state.player.playListVisible);
    }
  }
}
</script>

<style lang="scss" scoped>
.player-mini {
  padding: 5px 0;
  height: $mini-player-height;
  .container {
    display: flex;
    align-items: center;
    padding-right: 15px;
    background-color: #b3b3b3;
    height: calc(#{$mini-player-height} - 10px);
    border-radius: calc(#{$mini-player-height} - 10px);
    .song-cover {
      position: relative;
      width: calc((#{$mini-player-height} - 10px) * 1.1);
      height: calc((#{$mini-player-height} - 10px) * 1.1);
      background-color: #8f8e8e;
      margin-bottom: calc((#{$mini-player-height} - 10px) * 0.1);
      border-radius: 3px;
      overflow: hidden;
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 2px;
        display: block;
        box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.7);
        z-index: -1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    .song-title {
      margin: 0 10px;
      font-size: 15px;
      color: #fff;
      white-space: nowrap;
      overflow: hidden;
    }
    .play-button {
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      margin-right: 10px;
      i {
        font-size: 28px;
        color: #fff;
      }
    }
    .play-list {
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      i {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  
}
</style>