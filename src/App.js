import { Loading, GetProduct, AddProduct, EditProduct, SignUp, Login, MyPage, MyData, MyTransactions, Admin, Temp } from "./page";
import { getAllProducts_action, refreshPage_action } from "./redux/middleware";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Header, AdminHeader } from "./component";
import { HeaderLineDiv } from "./styledComponent";
import { useEffect } from "react";
import axios from "axios";
//
// addProduct 페이지에 대해서 관리자만 접근 가능하게 설정해야 함!
//
function App() {
  //
  const { isLoadingPage, isProductDataReady } = useSelector(
    (state) => ({
      isLoadingPage: state.product_reducer.isLoadingPage,
      isProductDataReady: state.product_reducer.isProductDataReady,
    }),
    shallowEqual
  );
  //
  const { isUserDataReady, isLogin, isAdmin } = useSelector(
    (state) => ({
      isUserDataReady: state.user_reducer.isUserDataReady,
      isLogin: state.user_reducer.isLogin,
      isAdmin: state.user_reducer.isAdmin,
    }),
    shallowEqual
  );
  //
  const dispatch = useDispatch();
  const nav = useNavigate();
  //
  useEffect(() => {
    //
    dispatch(getAllProducts_action());
    //
    (async () => {
      //
      const toLoginPageFn = () => nav("/login");
      //
      let adminAccountNum = await axios({ url: "http://3.34.144.225", method: "post" });
      adminAccountNum = adminAccountNum.data.adminAccountNum;
      //
      dispatch({ type: "SET_ADMIN_NUM", payload: adminAccountNum });
      dispatch(refreshPage_action(toLoginPageFn));
    })();
  }, []);
  //
  if (isLoadingPage && isUserDataReady && isProductDataReady) {
    //
    setTimeout(() => dispatch({ type: "LOADINGPAGE_OFF" }), 2000);
  }
  console.log("isUserDataReady:", isUserDataReady, ", isProductDataReady", isProductDataReady);
  //
  return (
    <div className="App">
      <Header />
      {isAdmin ? <AdminHeader></AdminHeader> : <></>}
      <HeaderLineDiv></HeaderLineDiv>
      <Routes>
        <Route path="/addProduct" element={<NonAdminRedirect page={<AddProduct />} />} />
        <Route path="/editProduct" element={<NonAdminRedirect page={<EditProduct />} />} />
        {/*  */}
        <Route path="/login" element={<LoadingRedirect page={<Login />} />} />
        <Route path="/" element={<LoadingRedirect page={<GetProduct />} />} />
        <Route path="/signUp" element={<LoadingRedirect page={<SignUp />} />} />
        {/*  */}
        <Route path="/myPage" element={<NonLoginRedirect page={<MyPage />} />} />
        <Route path="/myData" element={<NonLoginRedirect page={<MyData />} />} />
        <Route path="/myTransactions" element={<NonLoginRedirect page={<MyTransactions />} />} />
      </Routes>
    </div>
  );
  //
  ////////////////////////////////////
  function LoadingRedirect({ page }) {
    //
    return isLoadingPage ? <Loading /> : page;
  }
  //
  /////////////////////////////////////
  function NonLoginRedirect({ page }) {
    //
    if (isLoadingPage) {
      //
      return <Loading />;
    }
    //
    else if (isLogin) {
      //
      return page;
    }
    //
    else {
      //
      alert("회원 전용 페이지입니다.");
      return <Navigate to="/login" />;
    }
  }
  //
  /////////////////////////////////////
  function NonAdminRedirect({ page }) {
    //
    if (isLoadingPage) {
      //
      return <Loading />;
    }
    //
    else if (isAdmin) {
      //
      return page;
    }
    //
    else {
      //
      alert("관리자만 접근 가능한 페이지입니다.");
      return <Navigate to="/" />;
    }
  }
}
export default App;
