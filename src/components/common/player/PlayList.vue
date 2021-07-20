<template>
  <div class="play-list" ref="playList" @transitionend="listenTransitionEnd">
    <div class="content">
      <div class="header">
        <div class="mode" @click="handleChangeMode">
          <i :class="currentPlayMode.iconfont"></i>
          <span>{{currentPlayMode.name}}</span>
        </div>
        <div class="operate">
          <i class="iconfont icon-lajitong" @click="handleClearList"></i>
        </div>
      </div>
      <div class="cancle">关 闭</div>
    </div>
    <div class="mask" @click="handleHiddenList"></div>
  </div>
</template>

<script>
export default {
  name: "PlayList",
  data() {
    return {
    }
  },

  mounted() {
  },

  computed: {
    playListVisible() {
      return this.$store.state.player.playListVisible
    },
    currentPlayMode() {
      return this.$store.state.player.currentMode
    }
  },

  watch: {
    playListVisible: {
      handler(show) {
        console.log(show);
        if (show) {
          this.$refs.playList.style.display = "block"
          setTimeout(() => {
            this.$refs.playList.classList.add("show")
          },0)
        }else {
          this.$refs.playList.classList.remove("show")
        }
      }
    }
  },

  methods: {
    handleHiddenList() {
      this.$store.commit("changePlayListVisible", false)
      console.log(this.$store.state.player.playListVisible);
    },
    listenTransitionEnd(e) {
      if (!this.playListVisible) {
        this.$refs.playList.style.display = "none"
      }
      console.log(e);
    },
    handleChangeMode() {
      this.$store.commit("changePlayMode")
    },
    handleClearList() {
      console.log("清空列表");
    }
  }
}
</script>

<style lang="scss" scoped>
.play-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: none;
  .content {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 70%;
    padding:0 10px 40px;
    background-color: rgba($color: #ffffff, $alpha: .9);
    transform: translateY(100%);
    transition: $transition-time-base;
    z-index: 1;
    &::after {
      content: "";
      position:absolute;
      top:0;
      left:0;
      right: 0;
      bottom: 0;
      filter:blur(20px);
      z-index: -1;
    }
    .header {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      .mode {
        i {
          margin-right: 5px;
        }
      }
      .operate {
        i {
          font-size: 18px;
        }
      }
    }
    .cancle {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 40px;
      line-height: 30px;
      text-align: center;
      margin: 0 10px;
      border-top: 1px solid #e2e2e2;
    }
  }
  .mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000, $alpha: 0);
    transition: $transition-time-base;
  }
  &.show {
    .content {
      transform: translateY(0%);
      transition: $transition-time-base;
    }
    .mask {
      background-color: rgba($color: #000, $alpha: .6);
      transition: $transition-time-base;
      /* transition-delay: $transition-time-base; */
    }
  }
}
</style>