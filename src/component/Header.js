import { useDispatch, useSelector } from "react-redux";
import { RowFlexDiv, HeaderSpan } from "../styledComponent";
import { useNavigate } from "react-router-dom";
//
const Header = () => {
  //
  const nav = useNavigate();
  const dispatch = useDispatch();
  const toMainPageFn = () => nav("/");
  const isLogin = useSelector((state) => state.user_reducer.isLogin);
  //
  return (
    <RowFlexDiv>
      <HeaderSpan onClick={() => nav("/")}>Home</HeaderSpan>
      {isLogin ? (
        <>
          <HeaderSpan onClick={() => nav("/myPage")}>MyPage</HeaderSpan>
          <HeaderSpan onClick={() => dispatch({ type: "LOGOUT", payload: toMainPageFn })}>Logout</HeaderSpan>
        </>
      ) : (
        <>
          <HeaderSpan onClick={() => nav("/login")}>Login</HeaderSpan>
          <HeaderSpan onClick={() => nav("/signUp")}>SignUp</HeaderSpan>
        </>
      )}
    </RowFlexDiv>
  );
};
export default Header;
