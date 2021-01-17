import { createStore } from "vuex";

export default createStore({
  state: {
    email: "",
    status: false
  },
  getters: {
    email(state) {
      return state.email
    },
    isSignedIn(state) {
      return state.status;
    }
  },
  mutations: {
    onAuthEmailChanged(state, email) {
      state.email = email; // firebaseが返したユーザー情報
    },
    onUserStatusChanged(state, status) {
      state.status = status; // ログインしているかどうか true or false 
    }
  }
});
