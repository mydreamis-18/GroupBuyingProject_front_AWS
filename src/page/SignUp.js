import { ColumnFlexDiv, TitleP, BigLabel, Button } from "../styledComponent";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
//
const SignUp = () => {
  //
  const inputData = useRef({});
  const nav = useNavigate();
  //
  return (
    <>
      <TitleP>회원 가입</TitleP>
      <ColumnFlexDiv>
        <br />
        <BigLabel htmlFor="nickname">닉네임</BigLabel>
        <input id="nickname" name="nickname" autoComplete="off" ref={(el) => (inputData.current.nickname = el)} />
        <br />
        <BigLabel htmlFor="user_id">아이디</BigLabel>
        <input id="user_id" name="user_id" autoComplete="off" ref={(el) => (inputData.current.user_id = el)} />
        <br />
        <BigLabel htmlFor="password">비밀번호</BigLabel>
        <input id="password" name="password" type="password" autoComplete="off" ref={(el) => (inputData.current.password = el)} />
        <br />
        <Button onClick={signUp}>가입하기</Button>
        <br />
      </ColumnFlexDiv>
    </>
  );
  //
  /////////////////////////
  async function signUp() {
    //
    let isNull = false;
    const _inputData = {};
    //
    for (const key in inputData.current) {
      //
      if (Object.hasOwnProperty.call(inputData.current, key)) {
        //
        const el = inputData.current[key];
        //
        if (el.value === "") {
          //
          isNull = true;
          return;
        }
        _inputData[key] = el.value;
      }
    }
    if (isNull) return;
    //
    const _signUp = await axios({
      //
      url: "http://3.34.144.225/signUp",
      data: _inputData,
      method: "post",
    });
    const { isSuccess, alertMsg } = _signUp.data;
    if (isSuccess) {
      //
      nav("/login");
    }
    alert(alertMsg);
  }
};
export default SignUp;
