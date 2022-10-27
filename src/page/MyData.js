import { ColumnFlexDiv, TitleP, BigLabel, Button } from "../styledComponent";
import { updateMyData_action } from "../redux/middleware";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
//
const MyData = () => {
  //
  const nickname = useSelector((state) => state.user_reducer.nickname);
  // const [inputs, setInputs] = useState({ nickname: nickname });
  const dispatch = useDispatch();
  const newNickname = useRef();
  const nav = useNavigate();
  //
  // const handleChange = (e) => {
  //   setInputs({
  //     ...inputs,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  //
  console.log(newNickname, newNickname.current?.value);
  //
  // ㅜ 랜더링 이후에 ref 객체에 태그가 담겼을 때
  if (newNickname.current?.value === "") {
    //
    newNickname.current.value = nickname;
  }
  return (
    <>
      <TitleP>회원 정보 수정</TitleP>
      <ColumnFlexDiv>
        <br />
        <BigLabel htmlFor="nickname">닉네임</BigLabel>
        <input
          id="nickname"
          name="nickname"
          autoComplete="off"
          ref={newNickname}
          onChange={(e) => {
            newNickname.value = e.target.value;
          }}
        />
        <br />
        <Button onClick={updateMyDataFn}>수정하기</Button>
        <br />
      </ColumnFlexDiv>
    </>
  );
  //
  ///////////////////////////
  function updateMyDataFn() {
    //
    const isNull = newNickname.value === "";
    if (isNull) return;
    //
    const toLoginPageFn = () => nav("/login");
    dispatch(updateMyData_action(newNickname.value, toLoginPageFn));
  }
};
export default MyData;
