import { RowFlexDiv, SmallSpan, Button } from "../styledComponent";
import { refund_action } from "../redux/middleware";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
//
const Transaction = (props) => {
  //
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { id, name, price } = props.transaction.Product;
  const { type, created_at, updated_at, is_refund } = props.transaction;
  //
  return (
    <RowFlexDiv style={{ fontSize: "1vw" }}>
      <SmallSpan onClick={toProductPageFn}>{name}</SmallSpan>
      <SmallSpan>{price}</SmallSpan>
      <SmallSpan>{type}</SmallSpan>
      <SmallSpan>{created_at}</SmallSpan>
      {is_refund ? (
        <>
          <SmallSpan>환불 완료</SmallSpan>
          <SmallSpan>{updated_at}</SmallSpan>
        </>
      ) : (
        <>
          <SmallSpan>
            <Button onClick={refundFn}>환불</Button>
          </SmallSpan>
          <SmallSpan></SmallSpan>
        </>
      )}
    </RowFlexDiv>
  );
  function toProductPageFn() {
    //
    nav("/");
    dispatch({ type: "SELECT_PRODUCTS_IDX", payload: id });
  }
  function refundFn() {
    //
    const toLoginPageFn = () => nav("/login");
    dispatch(refund_action(type, id, name, price, created_at, toLoginPageFn));
  }
};
export default Transaction;
