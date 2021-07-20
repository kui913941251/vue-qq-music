<template>
  <div class="player-full" 
       :class="{show: playerFullVisible}"
       ref="playerFull"
       >
    <div class="header">
      <div class="back-icon" @click="handleHidden">
        <i class="iconfont icon-xiala"></i>
      </div>
      <div class="top-tab">
        歌曲| 歌词
      </div>
    </div>
    <div class="song-image">
      <img ref="songImg" src="@/assets/img/1.jpg" alt="">
    </div>
    <div class="song-info">
      <div class="song-title">
        这是一首歌的名字
      </div>
      <div class="song-singer">
        乃木坂46
      </div>
      <div class="current-lyric">
        当前歌词
      </div>
    </div>
    <div class="play-progress">
      <div class="play-line" @click="handleChangeProgress">
        <div class="play-now" ref="playNow">
          <div class="dot"></div>
        </div>
        <div class="catch-progress"></div>
      </div>
      <div class="play-time">
        <div class="current-time">01:18</div>
        <div class="total-time">03:18</div>
      </div>
    </div>
    <div class="play-tool">
      <div class="play-mode">
        <i :class="currentPlayMode.iconfont" @click="handleChangeMode"></i>
      </div>
      <div class="play-prev">
        <i class="iconfont icon-music-prev"></i>
      </div>
      <div class="play-pause">
        <i class="iconfont icon-bofang1" v-if="!playingStatus" @click="handlePlay"></i>
        <i class="iconfont icon-zantingtingzhi3" v-else @click="handlePause"></i>
      </div>
      <div class="play-next">
        <i class="iconfont icon-music-next-copy"></i>
      </div>
      <div class="play-list">
        <i class="iconfont icon-bofangliebiao1" @click="handleShowPlayList"></i>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "PlayerFull",

  computed: {
    playerFullVisible() {
      return this.$store.state.player.playerFullVisible
    },
    currentPlayMode() {
      return this.$store.state.player.currentMode
    },
    playingStatus() {
      return this.$store.state.player.isPlaying
    }
  },

  methods: {
    handleHidden() {
      this.$store.commit("changePlayerFullVisible", false)
    },
    handleChangeMode() {
      this.$store.commit("changePlayMode")
    },
    handleShowPlayList() {
      this.$store.commit("changePlayListVisible", true)
    },
    handlePause() {
      this.$store.commit("changePlayStatus")
      console.log("pause");
    },
    handlePlay() {
      const colorThief = new window.ColorThief();
      const img = this.$refs.songImg
      // Make sure image is finished loading
      let rgb = colorThief.getPalette(img)[0]
      let rgb2 = colorThief.getColor(img)
      console.log(rgb);
      img.addEventListener('load', function() {
        console.log(colorThief.getColor(img));
      });
      this.$refs.playerFull.style.backgroundColor = `rgb(${(rgb[0] + rgb2[0]) / 2},${(rgb[1] + rgb2[1]) / 2},${(rgb[2] + rgb2[2]) / 2})`


      this.$store.commit("changePlayStatus")
      console.log("play");
    },
    handleChangeProgress(e) {
      let playNow = this.$refs.playNow
      let domToLeft = playNow.getBoundingClientRect().left
      let clickToLeft = e.pageX
      let width = clickToLeft - domToLeft
      playNow.style.width = width + "px"
    }
  }
}
</script>

<style lang="scss" scoped>
.player-full {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 $player-full-padding 100px;
  background-color: rgba($color: #000000, $alpha: 0.5);
  transform: translateY(100%);
  transition: $transition-time-base;
  &.show {
    transform: translateY(0);
    transition: $transition-time-base;
    transition-delay: $transition-time-base;
  }
  .header {
    position: relative;
    display: flex;
    justify-content: center;
    padding: 10px;
    color: #fff;
    .back-icon {
      position: absolute;
      left: 0;
    }
    .top-tab {
      font-size: 15px;
    }
  }
  .song-image {
    width: 250px;
    height: 250px;
    background-color: #fff;
    border-radius: 10px;
    margin-top: 20px;
    margin: 20px auto 0;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .song-info {
    padding-top: 20px;
    .song-title{
      font-size: 20px;
      color: #fff;
      font-weight: 500;
    }
    .song-singer {
      padding-top: 10px;
      font-size: 18px;
      color: rgba($color: #fff, $alpha: .6);
    }
    .current-lyric {
      padding-top: 10px;
      font-size: 16px;
      color: rgba($color: #fff, $alpha: .6);
    }
  }

  .play-progress {
    position: absolute;
    left: 50%;
    bottom: 60px;
    transform: translateX(-50%);
    width: calc(100% - #{$player-full-padding * 2});
    height: 40px;
    .play-line {
      position: relative;
      width: 100%;
      height: 3px;
      background-color: rgba($color: #fff, $alpha: .3);
      .catch-progress {
        position: absolute;
        width: 70%;
        height: 100%;
        background-color: rgba($color: #fff, $alpha: .4);
      }
      .play-now {
        position: absolute;
        width: 30%;
        height: 100%;
        background-color: rgba($color: #fff, $alpha: .9);
        .dot {
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%) translateX(50%);
          height: 10px;
          width: 10px;
          border-radius: 50%;
          background-color: #fff;
        }
      }
    }
    .play-time {
      display: flex;
      justify-content: space-between;
      margin-top: 4px;
      color: rgba($color: #fff, $alpha: .4);
    }
  }

  .play-tool {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: calc(100% - #{$player-full-padding * 2});
    height: 60px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    .play-mode {
      margin-right: auto;
      i {
        font-size: 30px;
      }
    }
    .play-prev {
      i {
        font-size: 30px;
      }
    }
    .play-pause {
      margin: 0 25px;
      i {
        font-size: 40px;
      }
    }
    .play-next {
      i {
        font-size: 30px;
      }
    }
    .play-list {
      margin-left: auto;
      i {
        font-size: 30px;
      }
    }
  }
}
</style>