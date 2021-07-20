export function getSavePlayMode(modeMap) {
  const mode = localStorage.getItem("playmode") || "loop"
  return modeMap[mode]
}