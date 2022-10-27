import { RowFlexDiv, SmallSpan } from "../styledComponent";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//
const MyPageHeader = () => {
  //
  const nav = useNavigate();
  const points = useSelector((state) => state.user_reducer.points);
  //
  return (
    <RowFlexDiv>
      <SmallSpan style={{ fontWeight: "900" }} onClick={() => nav("/myTransactions")}>
        MyTransactions
      </SmallSpan>
      <SmallSpan style={{ fontWeight: "900" }}>MyPoints: {points}</SmallSpan>
      <SmallSpan style={{ fontWeight: "900" }} onClick={() => nav("/myData")}>
        MyData
      </SmallSpan>
    </RowFlexDiv>
  );
};
export default MyPageHeader;
