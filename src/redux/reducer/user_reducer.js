const init = {
  //
  points: null,
  userNum: null,
  isLogin: false,
  nickname: null,
  isAdmin: false,
  adminNum: null,
  isUserDataReady: false,
  notifications: new Array(0),
};
function reducer(state = init, action) {
  //
  const { isUserDataReady, isLogin, isAdmin, userNum, adminNum, nickname, points, notifications } = state;
  const { type, payload } = action;
  switch (type) {
    //
    ////////////////////////////
    case "USER_DATA_IS_LOADING":
      state.isUserDataReady = false;
      return state;
    //
    //////////////////////////
    case "USER_DATA_IS_READY":
      return { ...state, isUserDataReady: true };
    //
    ///////////////////
    case "SET_ADMIN_NUM":
      return { ...state, adminNum: payload };
    //
    /////////////
    case "LOGIN":
      if (payload.userNum === adminNum) {
        //
        state.isAdmin = true;
      }
      console.log(state);
      return { ...state, isLogin: true, userNum: payload.userNum, nickname: payload.nickname };
    //
    //////////////
    case "LOGOUT":
      if (userNum === adminNum) {
        //
        state.isAdmin = false;
      }
      const moveToPageFn = payload;
      //
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("refresh_token");
      console.log(sessionStorage);
      alert("로그아웃되었습니다.");
      moveToPageFn();
      //
      return { ...state, isLogin: false, userNum: null, nickname: null };
    //
    ///////////////////////////
    case "IS_NEW_ACCESS_TOKEN":
      if (payload !== undefined) {
        //
        sessionStorage.setItem("access_token", payload);
      }
      return state;
    //
    ///////////////////////
    case "CHANGE_NICKNAME":
      state.nickname = payload;
      return state;
    //
    /////////////////////
    case "UPDATE_POINTS":
      state.points = payload;
      return state;
    //
    //////////////////////////
    case "SAVE_NOTIFICATIONS":
      state.notifications = payload;
      return state;
    //
    ////////////////////////
    case "ADD_NOTIFICATION":
      state.notifications = [payload, ...state.notifications];
      return state;
    //
    default:
      return state;
  }
}
export default reducer;
