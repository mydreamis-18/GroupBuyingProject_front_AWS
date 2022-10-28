import axios from "axios";
//
////////////////////////////////////////////////////
export const buy_action = (type, toLoginPageFn) => {
  //
  return async (_dispatch, getState) => {
    //
    const RATE = 0.1;
    const { products, productsIdx } = getState().product_reducer;
    const { id, name, price } = products[productsIdx];
    const productPoints = price * RATE;
    //
    const newPoints = getState().user_reducer.points + productPoints;
    const { access_token, refresh_token } = sessionStorage;
    const { userNum } = getState().user_reducer;
    const _buy_action = await axios({
      //
      method: "post",
      url: "http://3.34.144.225/buy",
      data: { userNum, type, id, name, productPoints, newPoints, access_token, refresh_token },
    });
    const { isSuccess, alertMsg, newAccessToken, newTransition, newNotification } = _buy_action.data;
    if (isSuccess) {
      //
      const Product = { id, name, price };
      saveUserDataFn(_dispatch, newNotification, newAccessToken, newPoints);
      //
      _dispatch({ type: "ADD_TRANSACTION", payload: { ...newTransition, Product, type } });
    }
    //
    else _dispatch({ type: "LOGOUT", payload: toLoginPageFn });
    //
    alert(alertMsg);
  };
};
//
////////////////////////////////////////////////////////////////////////////////////////////
export const refund_action = (type, productNum, name, price, created_at, toLoginPageFn) => {
  //
  return async (_dispatch, getState) => {
    //
    const RATE = 0.1;
    const productPoints = price * RATE;
    const newPoints = getState().user_reducer.points + productPoints;
    //
    const { access_token, refresh_token } = sessionStorage;
    const { userNum } = getState().user_reducer;
    console.log(userNum);
    const _refund_action = await axios({
      //
      method: "post",
      url: "http://3.34.144.225/refund",
      data: { userNum, type, productNum, name, created_at, productPoints, newPoints, access_token, refresh_token },
    });
    const { isSuccess, alertMsg, newAccessToken, updated_at, newNotification } = _refund_action.data;
    if (isSuccess) {
      //
      saveUserDataFn(_dispatch, newNotification, newAccessToken, newPoints);
      //
      _dispatch({ type: "REFUND", payload: { type, productNum, created_at, updated_at } });
    }
    //
    else _dispatch({ type: "LOGOUT", payload: toLoginPageFn });
    //
    alert(alertMsg);
  };
};
//
/////////////////////////////////////////////////////////////////////////////////
function saveUserDataFn(_dispatch, newNotification, newAccessToken, newPoints) {
  //
  _dispatch({ type: "IS_NEW_ACCESS_TOKEN", payload: newAccessToken });
  _dispatch({ type: "ADD_NOTIFICATION", payload: newNotification });
  _dispatch({ type: "UPDATE_POINTS", payload: newPoints });
}
