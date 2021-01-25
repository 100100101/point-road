<template>
  <div ref="mapContainer" class="mapContainer" />
</template>
<script>
import methods from './methods'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import { mapState } from 'vuex'
import Marker from './components/Marker'
export default {
  computed: {
    ...mapState({
      mapState: state => state.map,
      routePoints: state => state.routePoints,
    }),
    routeCoordinats() {
      return this.routePoints.map(([, lng, lat]) => [lng, lat])
    },
  },

  methods,

  beforeCreate() {
    this.routeSourceLayerName = 'route'
    this.mapboxgl = mapboxgl
  },

  async mounted() {
    await this.initMap()

    this.addMapEvents()

    this.mapFeaturesComponentInstance = new this.constructor.super({
      ...Marker,
      parent: this,
    })

    this.$watch(
      'routeCoordinats',
      routeCoordinats => {
        if (!Array.isArray(routeCoordinats) || !routeCoordinats.length) return
        this.setRouteLine(this.routeSourceLayerName, routeCoordinats)
      },
      {
        immediate: true,
      },
    )
  },
}
</script>

<style lang="scss" scoped>
.mapContainer {
  height: 100%;
}
</style>
