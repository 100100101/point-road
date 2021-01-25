export default function (routeSourceLayerName, coordinates) {
  const SourceData = {
    type: 'LineString',
    coordinates,
  }

  this.$mapInstance.addSource(routeSourceLayerName, {
    type: 'geojson',
    lineMetrics: true,
    data: SourceData,
  })

  this.$mapInstance.addLayer({
    id: routeSourceLayerName,
    type: 'line',
    source: routeSourceLayerName,
    paint: {
      'line-color': '#80f',
      'line-dasharray': [5, 2, 1, 4],
      'line-width': 3,
    },
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
  })
}
