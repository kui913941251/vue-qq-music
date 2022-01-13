<template>
  <div class="player-full-lyric-pannel">
    <div class="song-title">
      <div class="marquee-content">{{ lyricInfo.title }}</div>
    </div>
    <div class="song-album">
      <div class="marquee-content">{{ lyricInfo.album }}</div>
    </div>
    <div class="song-lyric" ref="songLyric">
      <div class="lyric-container">
        <div class="lyric-item" v-for="(item, index) in lyricInfo.lyric" :key="index" :class="{ current: currentIndex === index }">
          <span>{{ item.words }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/httpClient/index.js'
import { parseLyric } from '@/utils/helper.js'
// import BScroll from '@better-scroll/core'
export default {
  name: 'PlayerFullLyricPannel',
  data() {
    return {
      lyricInfo: {},
      currentIndex: 0,
      bscroll: null,
      allowScroll: true,
      allowScrollTimer: null,
      isScroll: false,
    }
  },
  computed: {
    currentSong() {
      return this.$store.state.player.currentSong
    },
    audio() {
      return this.$store.state.player.audio
    },
  },

  watch: {
    currentSong: {
      handler() {
        this.getSongLyric()
      },
    },
  },
  mounted() {
    this.init()
  },

  methods: {
    async getSongLyric() {
      let res = await Api.getSongLyric({
        songMid: this.currentSong.songMid,
      })
      if (res.success) {
        let lyricInfo = parseLyric(res.data)
        this.lyricInfo = lyricInfo
      }
    },
    init() {
      this.$eventBus.$on('audioTimeUpdate', this.bindAudioTimeUpdate)
      this.$refs.songLyric.addEventListener('touchstart', this.bindLyricTouchStart)
      this.$refs.songLyric.addEventListener('touchmove', this.bindLyricTouchMove)
      // this.bscroll = new BScroll('.song-lyric')
    },
    bindAudioTimeUpdate() {
      let currentTime = this.audio.currentTime
      this.findCurrentLyric(currentTime)
    },
    bindLyricTouchStart() {
      this.allowScroll = false
    },
    bindLyricTouchMove() {
      clearTimeout(this.allowScrollTimer)
      this.allowScrollTimer = setTimeout(() => {
        this.allowScroll = true
      }, 5000)
    },
    async findCurrentLyric(currentTime) {
      if (this.lyricInfo.lyric) {
        // 设置高亮歌词
        let index = this.lyricInfo.lyric.findIndex((item) => {
          return item.time >= currentTime
        })
        if (index !== this.currentIndex) {
          // 移动歌词到指定位置
          let currentDom = document.querySelectorAll('.lyric-item')[index]
          if (currentDom && this.allowScroll) {
            let parentDom = currentDom.offsetParent
            let currentOffsetTop = currentDom.offsetTop
            if (parentDom && currentOffsetTop && currentOffsetTop < parentDom.scrollHeight) {
              await this.scrollTo(parentDom, currentOffsetTop - 20)
              // this.bscroll.scrollTo(0, -100)
              // this.bscroll.scrollToElement(currentDom, 0.1, 0, 0)
              // parentDom.style.transform = `translateY(-${currentOffsetTop}px)`
            }
          }
        }
        this.currentIndex = index || this.lyricInfo.lyric.length - 1
      }
    },
    scrollTo(el, target, time = 16) {
      return new Promise((resolve) => {
        let currentScrollTop = el.scrollTop
        let offset = (target - currentScrollTop) / time
        if (target > currentScrollTop) {
          // 向上
          let timer = setInterval(() => {
            let scrollTo = el.scrollTop + offset
            if (scrollTo > target) {
              scrollTo = target
              resolve()
              clearInterval(timer)
            }
            el.scrollTop = scrollTo
          }, 16)
        } else if (target < currentScrollTop) {
          // 向下
          let timer = setInterval(() => {
            let scrollTo = el.scrollTop + offset
            if (scrollTo < target) {
              scrollTo = target
              resolve()
              clearInterval(timer)
            }
            el.scrollTop = scrollTo
          }, 16)
        }
      })
      // console.log(target)
      // console.log(currentScrollTop)
      // console.log(offset)
    },
  },
}
</script>

<style scoped lang="scss">
.player-full-lyric-pannel {
  height: 100%;
  padding: 0 20px 20px;
  .song-title {
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 20px;
    color: #fff;
    overflow: hidden;
  }
  .song-album {
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    color: #fff;
    overflow: hidden;
  }
  .song-lyric {
    position: relative;
    height: calc(100% - 60px);
    overflow: scroll;
    .lyric-container {
      transition: 0.3s;
      .lyric-item {
        margin-bottom: 15px;
        font-size: 16px;
        color: rgba(255, 255, 255, 0.8);
        transform-origin: left;
        transition: 0.3s;
        &.current {
          transform: scale(1.1);
          color: aquamarine;
          transition: 0.3s;
        }
      }
    }
  }
}

</style>
