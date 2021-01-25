const getDefaultState = () => {
  return {
    center: [37.610225, 55.651365],
    zoom: 5,
    pitch: 0,
    bearing: 0,
    minZoom: 1.15,
    maxZoom: 24,
    metersInPx: 0,
  }
}

const state = () => getDefaultState()

const mutations = {
  updateMapState: (state, payload) => {
    if (Object.prototype.toString.call(payload) !== '[object Object]') return
    Object.assign(state, payload)
  },
}

const getters = {}

const actions = {}

export default {
  state,
  mutations,
  getters,
  actions,
}
