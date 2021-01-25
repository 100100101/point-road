export default function () {
  this.$mapInstance.on('move', () => {
    const { lng, lat } = this.$mapInstance.getCenter()
    this.$store.commit('updateMapState', {
      center: [lng, lat],
    })
  })

  this.$mapInstance.on('rotateend', () => {
    this.$store.commit('updateMapState', {
      bearing: this.$mapInstance.getBearing(),
    })
  })

  this.$mapInstance.on('zoom', () => {
    this.$store.commit('updateMapState', {
      zoom: this.$mapInstance.getZoom(),
    })
  })

  this.$mapInstance.on('pitchend', () => {
    this.$store.commit('updateMapState', {
      pitch: this.$mapInstance.getPitch(),
    })
  })
}
