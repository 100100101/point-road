<template>
  <v-app-bar app color="primary" dark prominent height="62">
    <v-btn v-if="isShowMotionButton" elevation="2" @click="toggleRoadPlay">
      {{ isRoadPlay ? 'Pause' : 'Play' }}
    </v-btn>

    <v-spacer />

    <v-select
      :items="items"
      label="Speed boost"
      :value="speedBoost"
      solo
      @change="changeSpeedBoost"
    />
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AppHeader',
  data: () => ({
    items: [1, 2, 5, 10, 20, 50, 100, 1000],
  }),
  computed: {
    ...mapState({
      isRoadPlay: state => state.isRoadPlay,
      routePoints: state => state.routePoints,
      speedBoost: state => state.speedBoost,
    }),
    isShowMotionButton() {
      return this.routePoints && this.routePoints.length
    },
  },
  methods: {
    changeSpeedBoost(value) {
      this.$store.commit('setSpeedBoost', value)
    },
    toggleRoadPlay() {
      this.$store.commit('setRoadPlay', !this.isRoadPlay)
    },
  },
}
</script>
