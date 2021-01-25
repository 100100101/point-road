<template>
  <v-app>
    <AppHeader />
    <v-main>
      <Map />
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import Map from '@/components/Map'
import { mapState } from 'vuex'
export default {
  name: 'App',

  components: {
    AppHeader,
    Map,
  },

  computed: mapState({
    routePoints: state => state.routePoints,
  }),

  methods: {
    async requestRoutePoints() {
      try {
        const routePoints = await this.axios.get('/api/coordinates.json')
        return routePoints?.data
      } catch (error) {
        console.error(error)
      }
    },
  },

  async created() {
    if (Array.isArray(this.routePoints) && !this.routePoints.length) {
      const routePoints = await this.requestRoutePoints()
      if (routePoints && routePoints.length) {
        this.$store.commit('setRoutePoints', routePoints)
      }
    }
  },
}
</script>
