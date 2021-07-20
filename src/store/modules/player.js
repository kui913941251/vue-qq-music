import { getSavePlayMode } from "@/utils/helper"

const modeMap = {
  loop: {
    code: "loop",
    next: "single",
    name: "列表循环",
    iconfont: "iconfont icon-liebiaoxunhuan1"
  },
  single: {
    code: "single",
    next: "random",
    name: "单曲循环",
    iconfont: "iconfont icon-danquxunhuan"
  },
  random: {
    code: "random",
    next: "loop",
    name: "随机播放",
    iconfont: "iconfont icon-bofangye-caozuolan-suijibofang"
  }
}
  


const state = {
  playerFullVisible: false,
  playListVisible: false,
  currentMode: getSavePlayMode(modeMap),
  isPlaying: false
}

const getters = {

}

const mutations = {
  changePlayerFullVisible(state, flag) {
    state.playerFullVisible = flag
    console.log(state.playerFullVisible);
  },
  changePlayListVisible(state, flag) {
    state.playListVisible = flag
  },
  changePlayMode(state) {
    let {currentMode} = state
    let nextMode = modeMap[currentMode.next]
    localStorage.setItem("playmode", nextMode.code)
    state.currentMode = nextMode
  },
  changePlayStatus(state) {
    state.isPlaying = !state.isPlaying
  }
}

const actions = {

}


export default {
  state,
  getters,
  mutations,
  actions
}

