<template>
  <div class="search-smart-box">
    <div class="direct-search" v-if="Object.keys(searchHint).length !== 0" @click="handleSearch">点击直接搜索</div>

    <div class="smart-item" v-if="searchHint.song">
      <div class="type">单曲</div>
      <ul>
        <li v-for="(item, index) in searchHint.song.itemlist" :key="item.id || index" @click="handlePlayMusic(item)">
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="smart-item" v-if="searchHint.singer">
      <div class="type">歌手</div>
      <ul>
        <li v-for="(item, index) in searchHint.singer.itemlist" :key="item.id || index">
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="smart-item" v-if="searchHint.album">
      <div class="type">专辑</div>
      <ul>
        <li v-for="(item, index) in searchHint.album.itemlist" :key="item.id || index">
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="smart-item" v-if="searchHint.mv">
      <div class="type">MV</div>
      <ul>
        <li v-for="(item, index) in searchHint.mv.itemlist" :key="item.id || index">
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Api from '@/httpClient'

export default {
  name: 'SearchSmartBox',
  props: {
    searchHint: {
      type: Object,
    },
  },
  methods: {
    handleSearch() {
      this.$emit('search')
    },
    async handlePlayMusic(songInfo) {
      console.log(songInfo)
      let { data: res } = await Api.getSongDetail({ songMid: songInfo.mid })
      res.songName = songInfo.name
      this.$store.commit("changeCurrent", res)
      this.$store.commit("changePlayStatus", true)
    },
  },
}
</script>

<style lang="scss" scoped>
.search-smart-box {
  margin-top: 10px;
  padding: 0 $common-padding;
  .direct-search {
    text-align: center;
    color: $them-color;
    padding-bottom: 10px;
  }
  .smart-item {
    display: flex;
    color: #000;
    .type {
      width: 40px;
      font-size: 15px;
      text-align: right;
      font-family: 黑体;
    }
    ul {
      padding-left: 20px;
      li {
        font-size: 15px;
        padding-bottom: 20px;
        overflow: hidden;
      }
    }
  }
}
</style>
