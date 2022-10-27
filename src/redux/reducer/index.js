import { combineReducers } from "redux";
import user_reducer from "./user_reducer";
import product_reducer from "./product_reducer";
import transaction_reducer from "./transaction_reducer";
//
const rootReducer = combineReducers({
    //
    user_reducer,
    product_reducer,
    transaction_reducer
});
export default rootReducer;
