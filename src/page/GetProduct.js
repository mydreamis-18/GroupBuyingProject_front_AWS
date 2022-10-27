import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { buy_action } from "../redux/middleware";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { LeftP, Button } from "../styledComponent";
//
const GetProduct = () => {
  //
  const { products, productsIdx, isDefaultImg } = useSelector(
    (state) => ({
      isDefaultImg: state.product_reducer.isDefaultImg,
      productsIdx: state.product_reducer.productsIdx,
      products: state.product_reducer.products,
    }),
    shallowEqual
  );
  const { isLogin, isAdmin } = useSelector(
    (state) => ({
      isLogin: state.user_reducer.isLogin,
      isAdmin: state.user_reducer.isAdmin,
    }),
    shallowEqual
  );
  const nav = useNavigate();
  const dispatch = useDispatch();
  const product = products[productsIdx];
  const [tense, setTense] = useState(null);
  const [isProduct, setIsProduct] = useState(false);
  const [DDayInterval, setDDayInterval] = useState(null);
  const [DDay, setDDay] = useState(product === undefined ? "" : getDDayFn);
  //
  console.log("interval");
  //
  if (!isProduct && product !== undefined) {
    //
    setIsProduct(true);
  }
  useEffect(() => {
    //
    clearInterval(DDayInterval);
    //
    if (isProduct) {
      //
      const isFuture = new Date(product.start_date) - new Date() > 0;
      if (isFuture) {
        //
        setDDay(getDDayFn("future"));
        setTense("future");
        return;
      }
      const isPast = new Date(product.end_date) - new Date() < 0;
      if (isPast) {
        //
        setDDay(getDDayFn("past"));
        setTense("past");
        return;
      }
      const _DDayInterval = setInterval(() => {
        //
        setDDay(getDDayFn("present"));
      }, 500);
      //
      setTense("present");
      setDDay(getDDayFn("present"));
      setDDayInterval(_DDayInterval);
    }
  }, [productsIdx]);
  //
  return (
    <div style={{ border: "1px solid black", margin: "0 10vw", padding: "2vw" }}>
      {isProduct ? (
        <>
          <img src={isDefaultImg ? require("../img/default.PNG") : "서버 주소" + product.img_path} alt="이미지" />
          <LeftP>상품명: {product.name}</LeftP>
          <LeftP>상품 설명: {product.content}</LeftP>
          <LeftP>{DDay}</LeftP>
          <LeftP>바로 구매가: {product.price}원</LeftP>
          <LeftP>공동 구매가: {product.discount_price}원</LeftP>
          <LeftP>현재 공동 구매자: 추후 구현 예정</LeftP>
          <LeftP>잔여 수량: {product.quantity}개</LeftP>
          <div style={{ display: "flex" }}>
            <Button style={{ marginLeft: "0" }} onClick={prevProductFn}>
              이전 상품
            </Button>
            <Button onClick={nextProductFn}>다음 상품</Button>
            {tense === "present" ? (
              <>
                <Button onClick={buyNowFn}>바로 구매하기</Button>
                <Button onClick={buyTogetherFn}>공동 구매하기</Button>
              </>
            ) : (
              <></>
            )}
            {isAdmin ? <Button onClick={() => nav("/editProduct")}>상품 수정하기</Button> : <></>}
          </div>
        </>
      ) : (
        <LeftP>등록된 상품이 없습니다.</LeftP>
      )}
    </div>
  );
  function buyNowFn() {
    //
    if (!isLogin) {
      //
      alert("로그인을 먼저 해주세요.");
      nav("/login");
      return;
    }
    if (window.confirm(`즉시 구매가 ${product.price}원에 바로 구매하시겠습니까?`)) {
      //
      const toLoginPageFn = () => nav("/login");
      dispatch(buy_action("바로 구매", toLoginPageFn));
    }
  }
  function buyTogetherFn() {
    //
    if (!isLogin) {
      //
      alert("로그인을 먼저 해주세요.");
      nav("/login");
      return;
    }
    if (window.confirm(`${product.discount_price}원에 공동 구매를 진행하시겠습니까?\n(종료 시까지 구매 인원이 1명일 경우 환불 처리될 예정입니다.)`)) {
      //
      const toLoginPageFn = () => nav("/login");
      dispatch(buy_action("공동 구매", toLoginPageFn));
    }
  }
  function getDDayFn(tense) {
    //
    if (tense === "future") {
      return (
        <>
          곧 공동 구매가 시작됩니다.
          <br />
          {dateToStringFn(product.start_date)} 시작
        </>
      );
    }
    if (tense === "past") {
      return (
        <>
          공동 구매가 종료되었습니다.
          <br />
          {dateToStringFn(product.end_date)} 종료
        </>
      );
    }
    if (tense === "present") {
      //
      const timeInterval = new Date(product.end_date) - new Date();
      //
      let seconds = Math.floor((timeInterval / 1000) % 60);
      let days = Math.floor(timeInterval / 1000 / 60 / 60 / 24);
      let minutes = Math.floor((timeInterval / 1000 / 60) % 60);
      let hours = Math.floor((timeInterval / 1000 / 60 / 60) % 24);
      //
      days = toTwoDigitNumber(days);
      hours = toTwoDigitNumber(hours);
      minutes = toTwoDigitNumber(minutes);
      seconds = toTwoDigitNumber(seconds);
      //
      return (
        <>
          공동 구매가 진행 중입니다.
          <br />
          종료까지 {days}일 {hours}:{minutes}:{seconds} 남음
        </>
      );
    }
  }
  function prevProductFn() {
    //
    dispatch({ type: "MINUS_PRODUCTS_IDX" });
  }
  function nextProductFn() {
    //
    dispatch({ type: "PLUS_PRODUCTS_IDX" });
  }
  function dateToStringFn(_date) {
    //
    if (typeof _date === "string") {
      //
      _date = new Date(_date);
    }
    const day = _date.getDay();
    const year = _date.getFullYear();
    const date = toTwoDigitNumber(_date.getDate());
    const hour = toTwoDigitNumber(_date.getHours());
    const minute = toTwoDigitNumber(_date.getMinutes());
    const month = toTwoDigitNumber(_date.getMonth() + 1);
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    //
    return `${year}년 ${month}월 ${date}일 ${days[day]}요일 ${hour}시 ${minute}분`;
  }
  function toTwoDigitNumber(number) {
    //
    const isTwoDigitNumber = number >= 10;
    if (isTwoDigitNumber) {
      //
      return number;
    }
    return "0" + number;
  }
};
export default GetProduct;
