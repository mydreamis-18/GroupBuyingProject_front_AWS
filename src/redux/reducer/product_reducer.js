const init = {
  //
  isProductDataReady: false,
  products: new Array(0),
  isLoadingPage: true,
  isDefaultImg: true,
  productsLength: 0,
  productsIdx: 0,
  temp: "temp",
};
function reducer(state = init, action) {
  //
  const { isProductDataReady, isLoadingPage, products, productsLength, productsIdx } = state;
  const { type, payload } = action;
  let newIdx = null;
  switch (type) {
    //
    ///////////////////////
    case "LOADINGPAGE_ON":
      state.isLoadingPage = true;
      return state;
    //
    ///////////////////////
    case "LOADINGPAGE_OFF":
      return { ...state, isLoadingPage: false };
    //
    ////////////////////////
    case "GET_ALL_PRODUCTS":
      // console.log("1");
      console.log("GET_ALL_PRODUCTS", payload);
      return { ...state, products: payload, productsLength: payload.length, isProductDataReady: true };
    //
    ///////////////////
    case "ADD_PRODUCT":
      return { ...state, products: [...products, payload], productsLength: productsLength + 1 };
    //
    /////////////////////
    case "EDIT_PRODUCT":
      //
      state.products.forEach((el, idx) => {
        //
        const { updateData } = payload;
        if (Number(updateData.id) === el.id) {
          //
          delete updateData.id;
          for (const key in updateData) {
            //
            if (Object.hasOwnProperty.call(updateData, key)) {
              //
              const value = updateData[key];
              //
              el[key] = value;
            }
          }
          return;
        }
      });
      payload.toMainPageFn();
      return state;
    //
    ////////////////////////
    case "PLUS_PRODUCTS_IDX":
      newIdx = productsIdx + 1;
      //
      const isLast = newIdx >= productsLength;
      if (isLast) newIdx = 0;
      //
      return { ...state, productsIdx: newIdx };
    //
    /////////////////////////
    case "MINUS_PRODUCTS_IDX":
      newIdx = productsIdx - 1;
      //
      const isFirst = newIdx < 0;
      if (isFirst) newIdx = productsLength - 1;
      //
      return { ...state, productsIdx: newIdx };
    //
    //////////////////////////
    case "SELECT_PRODUCTS_IDX":
      products.some((el, idx) => {
        //
        newIdx = idx;
        return el.id === payload;
      });
      return { ...state, productsIdx: newIdx };
    //
    default:
      return state;
  }
}
export default reducer;
