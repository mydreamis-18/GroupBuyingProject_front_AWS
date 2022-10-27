const init = {
  //
  transactions: new Array(0),
};
function reducer(state = init, action) {
  //
  const { type, payload } = action;
  const { transactions } = state;
  let _transactions = null;
  //
  switch (type) {
    //
    ////////////////////////
    case "SAVE_TRANSACTIONS":
      //
      const { BuyNowTransactions, BuyTogetherTransactions } = payload;
      if (BuyNowTransactions.length === 0 && BuyTogetherTransactions.length === 0) {
      }
      //
      else if (BuyNowTransactions.length === 0) {
        //
        state.transactions = BuyTogetherTransactions;
      }
      //
      else if (BuyTogetherTransactions.length === 0) {
        //
        state.transactions = BuyNowTransactions;
      }
      //
      else {
        _transactions = BuyNowTransactions.concat(BuyTogetherTransactions);
        _transactions.sort((a, b) => {
          //
          if (a.created_at > b.created_at) return 1;
          else if (a.created_at < b.created_at) return -1;
          return 0;
        });
        state.transactions = _transactions;
      }
      return state;
    //
    //////////////////////
    case "ADD_TRANSACTION":
      return { ...state, transactions: [...transactions, payload] };
    //
    /////////////
    case "REFUND":
      _transactions = transactions.map((el) => {
        //
        const isTransition = el.type === payload.type && el.Product.id === payload.productNum && el.created_at === payload.created_at;
        if (isTransition) {
          //
          return { ...el, is_refund: true, updated_at: payload.updated_at };
        }
        return el;
      });
      return { ...state, transactions: _transactions };
    //
    default:
      return state;
  }
}
export default reducer;
