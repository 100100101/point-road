export default function () {
  if (!this.myCustomLngLat || !this.linesOnMap) {
    if(this.layers.myCustomPositionAndAvatarConnectingLine.instance) {
      this.setLayerInstanceVisibility(
        this.myCustomPositionAndAvatarConnectingLineSourceAndLayerId,
        false
      )
    }
    return
  }

  const avatarUnproject = this.getUnprojectAvatar()

  const SourceData = {
    type: 'LineString',
    coordinates: [
      [avatarUnproject.lng, avatarUnproject.lat],
      this.myCustomLngLat,
    ]
  }

  const sourceInstance = this.sourceInstances.myCustomPositionAndAvatarConnectingLine
  if(sourceInstance) {
    sourceInstance.setData(
      SourceData
    )
    if(!this.layers.myCustomPositionAndAvatarConnectingLine.isVisible) {
      this.setLayerInstanceVisibility(this.myCustomPositionAndAvatarConnectingLineSourceAndLayerId, true)
    }
    return
  }

  this.$mapInstance.addSource(this.myCustomPositionAndAvatarConnectingLineSourceAndLayerId, {
    type: 'geojson',
    lineMetrics: true,
    data: SourceData
  })

  this.sourceInstances.myCustomPositionAndAvatarConnectingLine = this.$mapInstance.getSource(this.myCustomPositionAndAvatarConnectingLineSourceAndLayerId)

  const {themeColors} = this

  this.$mapInstance.addLayer({
    id: this.myCustomPositionAndAvatarConnectingLineSourceAndLayerId,
    type: 'line',
    source: this.myCustomPositionAndAvatarConnectingLineSourceAndLayerId,
    // 'paint': {
    //   'line-width': 2,
    //   'line-color': ['get', 'color'],
    //   'line-dasharray': [5, 2, 1, 4]
    // },
    paint: {
      // 'line-color': 'red',
      // 'line-color': ['get', 'color'],
      // 'line-gradient' must be specified using an expression
      // with the special 'line-progress' property
      // 'line-dasharray': [5, 2, 1, 4],
      'line-gradient': [
        'interpolate',
        ['linear'],
        ['line-progress'],
        0,
        themeColors[9],
        0.1,
        themeColors[10],
        0.3,
        themeColors[2],
        0.5,
        themeColors[4],
        0.7,
        themeColors[9],
        1,
        themeColors[9],
      ],
      'line-width': 1,
    },
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    }
  })

  this.layers.myCustomPositionAndAvatarConnectingLine.instance = this.$mapInstance.getLayer(this.myCustomPositionAndAvatarConnectingLineSourceAndLayerId)

}
