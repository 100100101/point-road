export default async function () {
  this.mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN

  const { center, zoom, pitch, bearing, minZoom, maxZoom } = this.mapState

  const attributionControl = false

  this.constructor.super.prototype.$mapInstance = new this.mapboxgl.Map({
    attributionControl,
    container: this.$refs.mapContainer,
    style: 'mapbox://styles/mapbox/streets-v11',
    center,
    zoom,
    pitch,
    bearing,
    minZoom,
    maxZoom,
    renderWorldCopies: false,
    failIfMajorPerformanceCaveat: false,
    preserveDrawingBuffer: false,
    antialias: false,
    keyboard: true,
    trackResize: true,
  })

  await new Promise(resolve => {
    this.$mapInstance.on('load', resolve)
  })

  // this.addMapEvents()
}
