import axios from "axios";
//
/////////////////////////////////////////////////////////////
// ㅜ 변수에 담으면 여러 개의 변수를 내보낼 수 있는 지 확인해보자!
export const getAllProducts_action = () => {
  //
  return async (_dispatch, getState) => {
    //
    const _getAllProducts_action = await axios({
      //
      url: "http://3.34.144.225/getAllProducts",
      method: "post",
    });
    const products = _getAllProducts_action.data;
    //
    // if (products.length === 0) return;
    //
    console.log(products)
    await _dispatch({ type: "GET_ALL_PRODUCTS", payload: products });
    // console.log("2");
    //
    // setTimeout(() => _dispatch({ type: "LOADINGPAGE_OFF" }), 2000);
  };
};
//
///////////////////////////////////////////////////////////////
export const addProduct_action = (formData, toLoginPageFn) => {
  //
  return async (_dispatch, getState) => {
    //
    const _isSuccess = await verifyTokens(_dispatch, toLoginPageFn);
    if (!_isSuccess) return;
    //
    const _addProduct_action = await axios({
      //
      data: formData,
      method: "post",
      url: "http://3.34.144.225/addProduct/formData",
    });
    const { isSuccess, alertMsg, newProduct } = _addProduct_action.data;
    if (isSuccess) {
      //
      _dispatch({ type: "ADD_PRODUCT", payload: newProduct });
    }
    alert(alertMsg);
  };
};
//
///////////////////////////////////////////////////////////////////
export const editProduct_action = (_updateData, path, toMainPageFn, toLoginPageFn) => {
  //
  return async (_dispatch, getState) => {
    //
    const _isSuccess = await verifyTokens(_dispatch, toLoginPageFn);
    console.log(_isSuccess);
    if (!_isSuccess) return;
    //
    console.log("please");
    const _editProduct_action = await axios({
      //
      method: "post",
      data: _updateData,
      url: `http://3.34.144.225/editProduct${path}`,
    });
    const { isSuccess, alertMsg, updateData } = _editProduct_action.data;
    console.log("is", isSuccess);
    if (isSuccess) {
      //
      _dispatch({ type: "EDIT_PRODUCT", payload: { updateData, toMainPageFn } });
    }
    alert(alertMsg);
  };
};
//
///////////////////////////////////////////////////////
async function verifyTokens(_dispatch, toLoginPageFn) {
  //
  const { access_token, refresh_token } = sessionStorage;
  const verifyTokens = await axios({
    //
    url: "http://3.34.144.225/verifyTokens",
    data: { access_token, refresh_token },
    method: "post",
  });
  const { isSuccess, newAccessToken } = verifyTokens.data;
  if (isSuccess) {
    //
    _dispatch({ type: "IS_NEW_ACCESS_TOKEN", payload: newAccessToken });
  }
  //
  else _dispatch({ type: "LOGOUT", payload: toLoginPageFn });
  //
  console.log(isSuccess);
  return isSuccess;
}
