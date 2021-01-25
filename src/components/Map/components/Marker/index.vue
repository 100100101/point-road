<template>
  <div class="marker">
    <span class="speed">{{ speed }}</span>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import { mapState } from 'vuex'
import { point, distance as turfDistance } from '@turf/turf'
export default {
  data() {
    return {
      speed: 0,
      startRoutePointIndex: 0,
    }
  },
  computed: {
    ...mapState({
      routePoints: state => state.routePoints,
      isRoadPlay: state => state.isRoadPlay,
      speedBoost: state => state.speedBoost,
    }),
    isRoadExist() {
      return Array.isArray(this.routePoints) && this.routePoints.length > 1
    },
  },
  methods: {
    createMarker() {
      this.marker = new mapboxgl.Marker(this.$el)
    },
    setMarkerLngLatByPoint([, lng, lat]) {
      this.marker.setLngLat([lng, lat])
    },
    setSpeed(timeMs, [, ...coordA], [, ...coordB]) {
      const from = point(coordA)
      const to = point(coordB)
      const distance = turfDistance(from, to, { units: 'kilometers' })
      if (distance === 0) return
      const timeHours = timeMs / (1000 * 60 * 60)
      this.speed = (distance / timeHours).toFixed(1)
    },
    async startMarkerRoad(routePoints) {
      do {
        if (!this.isRoadPlay) return
        const startPoint = routePoints[this.startRoutePointIndex]
        const currentPoint = routePoints[this.startRoutePointIndex + 1]
        const startTimeMs = +new Date(startPoint[0])
        const currentTimeMs = +new Date(currentPoint[0])
        const timeDiff = currentTimeMs - startTimeMs
        const timeToNextMarkerDraw = timeDiff / parseInt(this.speedBoost)
        await new Promise(resolve => setTimeout(resolve, timeToNextMarkerDraw))
        this.setSpeed(timeDiff, startPoint, currentPoint)
        this.setMarkerLngLatByPoint(currentPoint)
        this.startRoutePointIndex++
      } while (this.startRoutePointIndex < routePoints.length - 1)
    },
  },
  beforeCreate() {
    this.marker = null
  },
  created() {
    this.$nextTick(this.$mount)
  },
  mounted() {
    this.createMarker()
    this.$watch(
      'isRoadPlay',
      isRoadPlay => {
        if (!isRoadPlay || !this.isRoadExist) return
        this.startMarkerRoad(this.routePoints)
      },
      {
        immediate: true,
      },
    )
    this.$watch(
      'routePoints',
      routePoints => {
        if (!this.isRoadExist) return
        this.setMarkerLngLatByPoint(routePoints[0])
        this.marker.addTo(this.$mapInstance)
      },
      {
        immediate: true,
      },
    )
  },

  beforeDestroy() {
    if (this.marker) this.marker.remove()
  },
}
</script>

<style lang="scss" scoped>
.marker {
  background: rgba(255, 255, 255, 0.6);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(4px);
}
.speed {
  position: absolute;
}
</style>
