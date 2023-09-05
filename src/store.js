import Vue from 'vue';
import Vuex from 'vuex';



Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    houseData: null, // Variable zum Speichern der Hausdaten
    token: null, // Initialisiere token mit null
  },
  mutations: {
    setHouseData(state, data) {
      state.houseData = data;
    },
    clearHouseData(state) {
      state.houseData = null;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit('setToken', token);
    },
    saveHouseData({ commit }, data) {
      commit('setHouseData', data);
    },
    closeHouseFlat({ commit }) {
      commit('clearHouseData');
    },
  },
});