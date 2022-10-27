import { ColumnFlexDiv, TitleP, BigLabel, Button } from "../styledComponent";
import { login_action } from "../redux/middleware";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRef } from "react";
//
const Login = () => {
  //
  const dispatch = useDispatch();
  const loginData = useRef({});
  const nav = useNavigate();
  //
  return (
    <>
      <TitleP>로그인</TitleP>
      <ColumnFlexDiv>
        <br />
        <BigLabel htmlFor="user_id">아이디</BigLabel>
        <input id="user_id" name="user_id" autoComplete="off" ref={(el) => (loginData.current.user_id = el)} />
        <br />
        <BigLabel htmlFor="password">비밀번호</BigLabel>
        <input id="password" name="password" type="password" autoComplete="off" ref={(el) => (loginData.current.password = el)} />
        <br />
        <Button onClick={loginFn}>로그인</Button>
        <br />
      </ColumnFlexDiv>
    </>
  );
  //
  ////////////////////
  function loginFn() {
    //
    let isNull = false;
    const _loginData = {};
    const toMainPageFn = () => nav("/");
    //
    for (const key in loginData.current) {
      //
      if (Object.hasOwnProperty.call(loginData.current, key)) {
        //
        const el = loginData.current[key];
        //
        if (el.value === "") {
          //
          isNull = true;
          return;
        }
        _loginData[key] = el.value;
      }
    }
    if (isNull) return;
    //
    dispatch(login_action(_loginData, toMainPageFn));
  }
};
export default Login;
