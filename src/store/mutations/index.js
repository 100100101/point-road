export default {
  setRoutePoints: (state, routePoints) => {
    state.routePoints = Object.seal(routePoints)
  },
  setRoadPlay: (state, isPlay) => {
    state.isRoadPlay = isPlay
  },
  setSpeedBoost: (state, speedBoost) => {
    state.speedBoost = speedBoost
  },
}
