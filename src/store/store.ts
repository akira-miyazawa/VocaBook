import { createStore } from "vuex";

export default createStore({
  state: {
    user: {},
    status: false
  },
  mutations: {
    onAuthStateChanged(state, user) {
      state.user = user; // firebaseが返したユーザー情報
    },
    onUserStatusChanged(state, status) {
      state.status = status; // ログインしているかどうか true or false 
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    isSignedIn(state) {
      return state.status;
    }
  }
});
