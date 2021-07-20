<template>
  <div class="bottom" :class="[bottomVisible]">
    <player-mini />
    <tab-bar />
  </div>
</template>

<script>
import TabBar from '@/components/common/tabBar/TabBar.vue';
import PlayerMini from "@/components/common/player/PlayerMini"

export default {
  name: "Bottom",
  components: {
    TabBar,
    PlayerMini
  },

  data() {
    return {
      tabVisible: false
    }
  },

  computed: {
    bottomVisible() {
      if (this.$store.state.player.playerFullVisible) {
        return "bottom-hidden"
      }else if (!this.tabVisible) {
        return "tab-bar-hidden"
      }else {
        return ""
      }
    }
  },

  watch: {
    "$route"(newRoute) {
      this.getTabVisible(newRoute.path)
    }
  },

  befroeMount(){
    this.getTabVisible(this.$route.path)
    console.log(this.tabVisible);
  },

  mounted() {
    console.log(this.tabVisible);
  },

  methods: {
    getTabVisible(currentRoute) {
      console.log(currentRoute);
      let shouldHiddenPath = ["/search"]
      this.tabVisible = shouldHiddenPath.findIndex(item => currentRoute === item) === -1
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: calc(#{$tab-height} + #{$mini-player-height});
  margin: 0 $common-padding;
  transition: .3s;
  transition-delay: $transition-time-base;
  &.bottom-hidden {
    transform: translateY(calc(#{$tab-height} + #{$mini-player-height} + #{$mini-player-height} * 0.1));
    transition: $transition-time-base;
  }
  &.tab-bar-hidden {
    transform: translateY($tab-height);
    transition: $transition-time-base;
  }
}
</style>