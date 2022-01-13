export function getSavePlayMode(modeMap) {
  const mode = localStorage.getItem('playmode') || 'loop'
  return modeMap[mode]
}

export function formatPlayingTime(time) {
  if (time) {
    let minute = ('0000' + Math.floor(time / 60)).slice(-2)
    let second = ('0000' + Math.floor(time % 60)).slice(-2)
    return minute + ':' + second
  } else {
    return '00:00'
  }
}

export function parseLyric(lyric) {
  let lyricObj = {
    title: '',
    singer: '',
    album: '',
    lyric: [],
  }
  let arr = lyric.split('\n')
  arr.forEach((item) => {
    let lyricReg = /\[([0-9]{2}):([0-9]{2})\.[0-9]{2,}\](.+)/
    let lyricRes = lyricReg.exec(item)
    if (lyricRes) {
      let minute = lyricRes[1]
      let second = lyricRes[2]
      let words = lyricRes[3]
      let time = minute * 60 + second * 1
      lyricObj.lyric.push({
        time,
        words,
      })
    }
    let titleReg = /\[ti:(.+)\]/
    let titleRes = titleReg.exec(item)
    if (titleRes) {
      lyricObj.title = titleRes[1]
    }
    let singerReg = /\[ar:(.+)\]/
    let singerRes = singerReg.exec(item)
    if (singerRes) {
      lyricObj.singer = singerRes[1]
    }
    let albumReg = /\[al:(.+)\]/
    let albumRes = albumReg.exec(item)
    if (albumRes) {
      lyricObj.album = albumRes[1]
    }
  })
  console.log(lyricObj);
  return lyricObj
}
