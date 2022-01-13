<template>
  <div class="player-full-main-pannel">
    <div class="song-image">
      <img ref="songImg" :src="cover" alt="" />
    </div>
    <div class="song-info">
      <div class="song-title">
        {{ currentSong.songName || '歌曲' }}
      </div>
      <div class="song-album">
        {{ currentSong.album ? currentSong.album.albumName : '专辑' }}
      </div>
      <div class="song-singer">
        {{ currentSong.singer ? currentSong.singer.map((item) => item.singerName).join('、') : '歌手' }}
      </div>
      <div class="current-lyric">
        当前歌词
      </div>
    </div>
    <div class="play-progress">
      <div class="play-line" ref="playLine" @click="handleChangeProgress">
        <div class="play-now" ref="playNow" :style="{ width: processCurrentPercent + '%' }">
          <div class="dot"></div>
        </div>
        <div class="catch-progress"></div>
      </div>
      <div class="play-time">
        <div class="current-time">{{ currentTime }}</div>
        <div class="total-time">{{ totalTime }}</div>
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
import { formatPlayingTime } from '@/utils/helper.js'

export default {
  name: 'PlayerFullMainPannel',
  data() {
    return {
      currentTime: '00:00',
      totalTime: '00:00',
      processTotalWidth: 0,
      processCurrentPercent: 0,
    }
  },
  computed: {
    currentPlayMode() {
      return this.$store.state.player.currentMode
    },
    playingStatus() {
      return this.$store.state.player.isPlaying
    },
    cover() {
      return this.$store.state.player.currentSong.cover
    },
    currentSong() {
      return this.$store.state.player.currentSong
    },
    audio() {
      return this.$store.state.player.audio
    },
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      this.processTotalWidth = this.$refs.playLine.clientWidth
      this.$eventBus.$on('audioTimeUpdate', this.bindAudioTimeUpdate)
    },
    bindAudioTimeUpdate(e) {
      console.log(e)
      this.currentTime = formatPlayingTime(this.audio.currentTime)
      this.totalTime = formatPlayingTime(this.audio.duration)
      this.processCurrentPercent = Math.ceil((this.audio.currentTime / this.audio.duration) * 100)
    },
    handleChangeMode() {
      this.$store.commit('changePlayMode')
    },
    handleShowPlayList() {
      this.$store.commit('changePlayListVisible', true)
    },
    handlePause() {
      this.$store.commit('changePlayStatus', false)
    },
    async handlePlay() {
      this.$store.commit('changePlayStatus')
    },
    handleChangeProgress(e) {
      let playNow = this.$refs.playNow
      let domToLeft = playNow.getBoundingClientRect().left
      let clickToLeft = e.pageX
      let width = clickToLeft - domToLeft
      this.processCurrentPercent = Math.ceil((width / this.processTotalWidth) * 100)
      let currentTime = Math.floor(this.audio.duration * (width / this.processTotalWidth))
      this.audio.currentTime = currentTime
    },
  },
}
</script>

<style scoped lang="scss">
.player-full-main-pannel {
  padding: 0 $player-full-padding 100px;
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
    .song-title {
      font-size: 20px;
      color: #fff;
      font-weight: 500;
    }
    .song-album {
      padding-top: 2px;
      font-size: 18px;
      color: rgba($color: #fff, $alpha: 0.6);
    }
    .song-singer {
      padding-top: 10px;
      font-size: 18px;
      color: rgba($color: #fff, $alpha: 0.6);
    }
    .current-lyric {
      padding-top: 10px;
      font-size: 16px;
      color: rgba($color: #fff, $alpha: 0.6);
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
      background-color: rgba($color: #fff, $alpha: 0.3);
      .catch-progress {
        position: absolute;
        width: 0%;
        height: 100%;
        background-color: rgba($color: #fff, $alpha: 0.4);
      }
      .play-now {
        position: absolute;
        width: 0%;
        height: 100%;
        background-color: rgba($color: #fff, $alpha: 0.9);
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
      color: rgba($color: #fff, $alpha: 0.4);
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
