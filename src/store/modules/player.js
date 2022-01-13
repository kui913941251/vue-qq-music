import eventBus from '../../utils/eventBus'
import { getSavePlayMode } from '@/utils/helper'

const modeMap = {
  loop: {
    code: 'loop',
    next: 'single',
    name: '列表循环',
    iconfont: 'iconfont icon-liebiaoxunhuan1',
  },
  single: {
    code: 'single',
    next: 'random',
    name: '单曲循环',
    iconfont: 'iconfont icon-danquxunhuan',
  },
  random: {
    code: 'random',
    next: 'loop',
    name: '随机播放',
    iconfont: 'iconfont icon-bofangye-caozuolan-suijibofang',
  },
}

const audio = document.createElement('audio')

audio.addEventListener("timeupdate", (e) => {
  eventBus.$emit("audioTimeUpdate", e)
})

const state = {
  playerFullVisible: false,
  playListVisible: false,
  currentMode: getSavePlayMode(modeMap),
  isPlaying: false,
  playList: [],
  currentSong: {},
  audio: audio
}

const getters = {}

const mutations = {
  changePlayerFullVisible(state, flag) {
    state.playerFullVisible = flag
  },
  changePlayListVisible(state, flag) {
    state.playListVisible = flag
  },
  changePlayMode(state) {
    let { currentMode } = state
    let nextMode = modeMap[currentMode.next]
    localStorage.setItem('playmode', nextMode.code)
    state.currentMode = nextMode
  },
  changePlayStatus(state, flag = null) {
    if (flag !== null) {
      state.isPlaying = flag
    } else {
      state.isPlaying = !state.isPlaying
    }
    if (state.isPlaying) {
      audio.play()
    } else {
      audio.pause()
    }
  },
  changeCurrent(state, song) {
    localStorage.setItem('currentSong', JSON.stringify(song))
    state.currentSong = song
    audio.src = song.songUrl
  },
}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions,
}
