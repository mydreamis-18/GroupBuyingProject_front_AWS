import { useSelector } from "react-redux";
import { useEffect } from "react";
//
const Temp = () => {
  //
  // ㅜ 저장소의 temp 값이 변경되지 않더라도 state 값이 변경됨에 따라 여러 번 실행됨
  const temp = useSelector((state) => {
    //
    console.log("1, 3, 5");
    //
    return state.product_reducer.temp;
  });
  console.log("2, 6", temp);
  //
  useEffect(() => console.log("4", temp), []);
  //
  return <div style={{ margin: "20vw", fontSize: "10vw", fontWeight: "900" }}>Temp</div>;
};
export default Temp;
