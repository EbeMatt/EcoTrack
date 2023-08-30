import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    houseData: null, // Variable zum Speichern der Hausdaten
  },
  mutations: {
    setHouseData(state, data) {
      state.houseData = data;
    },
    clearHouseData(state) {
      state.houseData = null;
    },
  },
  actions: {
    saveHouseData({ commit }, data) {
      commit('setHouseData', data);
    },
    closeHouseFlat({ commit }) {
      commit('clearHouseData');
    },
  },
});