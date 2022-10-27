import axios from "axios";
//
//////////////////////////////////////////////////////////
export const login_action = (loginData, toMainPageFn) => {
  //
  return async (_dispatch, getState) => {
    //
    _dispatch({ type: "USER_DATA_IS_LOADING" });
    _dispatch({ type: "LOADINGPAGE_ON" });
    //
    const _login_action = await axios({
      //
      url: "http://3.34.144.225/login",
      data: loginData,
      method: "post",
    });
    const { isSuccess, alertMsg, access_token, refresh_token, userData } = _login_action.data;
    if (isSuccess) {
      //
      //
      sessionStorage.setItem("refresh_token", refresh_token);
      sessionStorage.setItem("access_token", access_token);
      _dispatch({ type: "USER_DATA_IS_READY" });
      //
      saveUserDataFn(_dispatch, userData);
      toMainPageFn();
      //
    }
    // ㅜ 세션의 키 값 가져오기
    // console.log(sessionStorage.key(0))
    // console.log(sessionStorage.key(1))
    // console.log(sessionStorage.length)
    //
    alert(alertMsg);
  };
};
//
/////////////////////////////////////////////////////////////////
export const updateMyData_action = (nickname, toLoginPageFn) => {
  //
  return async (_dispatch, getState) => {
    //
    const { access_token, refresh_token } = sessionStorage;
    const { userNum } = getState().user_reducer;
    const _updateMyData_action = await axios({
      //
      method: "post",
      url: "http://3.34.144.225/updateMyData",
      data: { userNum, nickname, access_token, refresh_token },
    });
    const { isSuccess, alertMsg, newAccessToken } = _updateMyData_action.data;
    if (isSuccess) {
      //
      _dispatch({ type: "IS_NEW_ACCESS_TOKEN", payload: newAccessToken });
      _dispatch({ type: "CHANGE_NICKNAME", payload: nickname });
    }
    //
    else _dispatch({ type: "LOGOUT", payload: toLoginPageFn });
    //
    alert(alertMsg);
  };
};
//
///////////////////////////////////////////////////////
export const refreshPage_action = (toLoginPageFn) => {
  //
  return async (_dispatch, getState) => {
    //
    const { access_token, refresh_token } = sessionStorage;
    if (access_token === undefined && refresh_token === undefined) {
      //
      _dispatch({ type: "USER_DATA_IS_READY" });
      return;
    }
    const _refreshPage_action = await axios({
      //
      method: "post",
      data: { access_token, refresh_token },
      url: "http://3.34.144.225/refreshPage",
    });
    const { isSuccess, newAccessToken, userData } = _refreshPage_action.data;
    if (isSuccess) {
      //
      saveUserDataFn(_dispatch, userData);
      //
      _dispatch({ type: "IS_NEW_ACCESS_TOKEN", payload: newAccessToken });
    }
    //
    else _dispatch({ type: "LOGOUT", payload: toLoginPageFn });
    //
    _dispatch({ type: "USER_DATA_IS_READY" });
  };
};
//
//////////////////////////////////////////////
function saveUserDataFn(_dispatch, userData) {
  //
  const { id, nickname, points, BuyNowTransactions, BuyTogetherTransactions, Notifications } = userData;
  //
  _dispatch({ type: "SAVE_TRANSACTIONS", payload: { BuyNowTransactions, BuyTogetherTransactions } });
  _dispatch({ type: "SAVE_NOTIFICATIONS", payload: Notifications });
  _dispatch({ type: "LOGIN", payload: { userNum: id, nickname } });
  _dispatch({ type: "UPDATE_POINTS", payload: points });
}
