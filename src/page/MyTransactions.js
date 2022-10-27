import { MyPageHeader, Transaction } from "../component";
import { RowFlexDiv, SmallSpan } from "../styledComponent";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
//
const MyTransactions = () => {
  //
  const [myHistory, setMyHitory] = useState("거래 내역이 없습니다.");
  const transactions = useSelector((state) => state.transaction_reducer.transactions);
  console.log("tran");
  //
  useEffect(() => {
    //
    if (transactions.length !== 0) {
      //
      const _transactions = transactions.map((el, idx) => <Transaction transaction={el} key={idx}></Transaction>);
      setMyHitory(_transactions);
    }
  }, [transactions]);
  //
  return (
    <>
      <MyPageHeader></MyPageHeader>
      <RowFlexDiv style={{ fontSize: "1vw" }}>
        <SmallSpan>상품명</SmallSpan>
        <SmallSpan>구매 가격</SmallSpan>
        <SmallSpan>구매 방법</SmallSpan>
        <SmallSpan>구매 시각</SmallSpan>
        <SmallSpan>환불 여부</SmallSpan>
        <SmallSpan>환불 시각</SmallSpan>
      </RowFlexDiv>
      {myHistory}
    </>
  );
};
export default MyTransactions;
