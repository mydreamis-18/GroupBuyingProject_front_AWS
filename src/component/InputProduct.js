import { ColumnFlexDiv, TitleP, SmallLabel, Button, AddProductImg } from "../styledComponent";
import { addProduct_action, editProduct_action } from "../redux/middleware";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "../component";
//
const InputProduct = (props) => {
  //
  const { products, productsIdx, isDefaultImg } = useSelector(
    (state) => ({
      isDefaultImg: state.product_reducer.isDefaultImg,
      productsIdx: state.product_reducer.productsIdx,
      products: state.product_reducer.products,
    }),
    shallowEqual
  );
  const [isNewImg, setIsNewImg] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const product = products[productsIdx];
  const dispatch = useDispatch();
  const newProduct = useRef({});
  const { pageName } = props;
  const nav = useNavigate();
  //
  // ㅜ 부모 컴포넌트의 등록 및 수정하기 버튼 클릭 시 DB에 저장하기 위해 부모 컴포넌트의 state 값 사용
  const [startDate, setStartDate] = useState(toZeroSecondFn(new Date()));
  const [endDate, setEndDate] = useState(startDate);
  //
  // ㅜ 사진 선택 시 이미지 미리보기 기능을 위해 리렌더링 유도
  const [img, setImg] = useState("");
  //
  // ㅜ undefined
  // console.log(products);
  //
  // ㅜ onChange = { inputsHandlerFn };
  // const inputsHandlerFn = (e) => {
  //   //
  //   const { name, value } = e.target;
  //   //
  //   newProduct.current = { ...newProduct.current, [name]: value };
  // };
  //
  useEffect(() => {
    //
    // ㅜ 상품 정보 수정 페이지용
    if (pageName === "edit" && products.length !== 0) {
      //
      console.log(product);
      for (const key in newProduct.current) {
        //
        if (Object.hasOwnProperty.call(newProduct.current, key)) {
          //
          newProduct.current[key].value = product[key];
        }
      }
      setEndDate(new Date(product.end_date));
      setStartDate(new Date(product.start_date));
      //
      if (!isDefaultImg) {
        //
        setImg("http://3.34.144.225" + decodeURIComponent(product.img_path));
      }
    }
  }, [products]);
  //
  function imgChangeFn(file) {
    //
    if (file === undefined) {
      //
      setIsNewImg(false);
    }
    //
    else if (!isNewImg) {
      //
      setIsNewImg(true);
    }
    setImg(file);
  }
  return (
    <ColumnFlexDiv>
      <TitleP>{pageName === "add" ? "상품 등록" : "상품 정보 수정"}</TitleP>
      <SmallLabel>상품명 </SmallLabel>
      <input name="name" autoComplete="off" ref={(el) => (newProduct.current.name = el)} />
      <SmallLabel>상품 설명 </SmallLabel>
      <input name="content" autoComplete="off" ref={(el) => (newProduct.current.content = el)} />
      <SmallLabel>상품 이미지 </SmallLabel>
      <input name="img" type="file" accept="image/*" style={{ transform: "translateX(2vw)" }} onChange={(e) => imgChangeFn(e.target.files[0])} />
      <AddProductImg src={isNewImg ? URL.createObjectURL(img) : isDefaultImg ? require("../img/default.PNG") : img} alt="" />
      <SmallLabel>재고 수량 </SmallLabel>
      <input name="quantity" type="number" min={"0"} autoComplete="off" ref={(el) => (newProduct.current.quantity = el)} />
      <SmallLabel>즉시 구매가 </SmallLabel>
      <input name="price" type="number" step={"1000"} min={"0"} autoComplete="off" ref={(el) => (newProduct.current.price = el)} onClick={(e) => autoCalculationFn(e)} onBlur={(e) => autoCalculationFn(e)} />
      <SmallLabel>공동 구매가 </SmallLabel>
      <input name="discount_price" type="number" step={"1000"} min={"0"} autoComplete="off" ref={(el) => (newProduct.current.discount_price = el)} onClick={(e) => autoCalculationFn(e)} onBlur={(e) => autoCalculationFn(e)} />
      <SmallLabel>공동 구매 할인율 (%) </SmallLabel>
      <input name="discount_rate" type="number" step={"10"} min={"0"} max={"100"} autoComplete="off" ref={(el) => (newProduct.current.discount_rate = el)} onClick={(e) => autoCalculationFn(e)} onBlur={(e) => autoCalculationFn(e)} />
      <DatePicker stateArr={[startDate, setStartDate, endDate, setEndDate]} fn={[toZeroSecondFn]} />
      <Button onClick={pageName === "add" ? addProductFn : editProductFn}>{pageName === "add" ? "상품 등록하기" : "상품 정보 수정하기"}</Button>
    </ColumnFlexDiv>
  );
  //
  ////////////////////////////////
  function toZeroSecondFn(_date) {
    //
    const date = _date.getDate();
    const hour = _date.getHours();
    const month = _date.getMonth();
    const year = _date.getFullYear();
    const minute = _date.getMinutes();
    //
    return new Date(year, month, date, hour, minute, 0);
  }
  //
  ///////////////////////////////
  function autoCalculationFn(e) {
    //
    const discountPrice = newProduct.current.discount_price.value;
    const discountRate = newProduct.current.discount_rate.value;
    const price = newProduct.current.price.value;
    //
    const isPriceNull = (discountPrice !== "" || discountRate !== "") && price === "";
    if (isPriceNull) {
      //
      newProduct.current.discount_price.value = "";
      newProduct.current.discount_rate.value = "";
      alert("즉시 구매가를 먼저 입력해주세요");
      return;
    }
    const priceCheck = Number(discountPrice) > Number(price);
    if (priceCheck) {
      //
      alert("공동 구매가는 즉시 구매가보다 할인된 가격이어야 합니다.");
      newProduct.current.discount_price.value = price;
      newProduct.current.discount_rate.value = 0;
      return;
    }
    const isZero = price === "0" && (discountPrice === "0" || discountRate === "0");
    if (isZero) {
      //
      newProduct.current.discount_price.value = 0;
      newProduct.current.discount_rate.value = 0;
      setIsAlert(false);
      //
      if (isAlert === false) {
        //
        alert("무료 상품으로 설정되었습니다.");
        setIsAlert(true);
      }
      return;
    }
    if (e.target.value === "") {
      //
      switch (e.target.name) {
        case "price":
          newProduct.current.discount_price.value = "";
          newProduct.current.discount_rate.value = "";
          return;
        case "discount_price":
          newProduct.current.discount_rate.value = "";
          return;
        case "discount_rate":
          newProduct.current.discount_price.value = "";
          return;
        default:
          return;
      }
    }
    const _price = Number(price);
    let _discountPrice = Number(discountPrice);
    const _discountRate = Number(discountRate);
    //
    const isAutoDiscountPrice = e.target.name === "discount_rate";
    if (isAutoDiscountPrice) {
      //
      const autoDiscountPrice = parseInt((_price * (100 - _discountRate)) / 100);
      //
      newProduct.current.discount_price.value = autoDiscountPrice;
      _discountPrice = autoDiscountPrice;
    }
    if (discountPrice === "") return;
    //
    const autoDiscountRate = parseInt(((_price - _discountPrice) / _price) * 100);
    //
    newProduct.current.discount_rate.value = autoDiscountRate;
  }
  //
  //////////////////////////
  function addProductFn() {
    //
    if (isNullFn()) return;
    //
    // ㅜ 태그가 담긴 ref 객체 그대로를 백엔드로 보내면 에러 발생함 주의
    // for (const key in product.current) {
    //   //
    //   if (Object.hasOwnProperty.call(newProduct.current, key)) {
    //     //
    //     product.current[key] = product.current[key].value;
    //   }
    // }
    //
    const formData = new FormData();
    const toLoginPageFn = () => nav("/login");
    //
    for (const key in newProduct.current) {
      //
      if (Object.hasOwnProperty.call(newProduct.current, key)) {
        //
        formData.append(key, newProduct.current[key].value);
      }
    }
    formData.append("img_path", "/tmp/uploads/" + img.name);
    formData.append("start_date", startDate.toString());
    formData.append("end_date", endDate.toString());
    formData.append("img", img);
    URL.revokeObjectURL(img);
    //
    dispatch(addProduct_action(formData, toLoginPageFn));
  }
  //
  ///////////////////////////
  function editProductFn() {
    //
    if (isNullFn()) return;
    //
    let path = "";
    const updateProduct = {};
    const toMainPageFn = () => nav("/");
    const toLoginPageFn = () => nav("/login");
    //
    for (const key in newProduct.current) {
      //
      if (Object.hasOwnProperty.call(newProduct.current, key)) {
        //
        const el = newProduct.current[key];
        if (el.value !== product[key].toString()) {
          //
          updateProduct[key] = el.value;
        }
      }
    }
    if (startDate.toString() !== product.start_date) {
      //
      updateProduct.start_date = startDate.toString();
    }
    if (endDate.toString() !== product.end_date) {
      //
      updateProduct.end_date = endDate.toString();
    }
    console.log(img);
    if (img !== "") {
      //
      const formData = new FormData();
      for (const key in updateProduct) {
        //
        if (Object.hasOwnProperty.call(updateProduct, key)) {
          //
          const value = updateProduct[key];
          formData.append(key, value);
        }
      }
      path = "/formData";
      URL.revokeObjectURL(img);
      formData.append("img", img);
      formData.append("id", product.id);
      formData.append("img_path", "/tmp/uploads/" + img.name);
      //
      dispatch(editProduct_action(formData, path, toMainPageFn, toLoginPageFn));
      return;
    }
    if (Object.keys(updateProduct).length === 0) {
      //
      alert("변경 사항이 없습니다.");
      return;
    }
    updateProduct.id = product.id;
    dispatch(editProduct_action(updateProduct, path, toMainPageFn, toLoginPageFn));
  }
  //
  /////////////////////
  function isNullFn() {
    //
    let isNull = false;
    //
    for (const key in newProduct.current) {
      //
      if (Object.hasOwnProperty.call(newProduct.current, key)) {
        //
        const el = newProduct.current[key];
        if (el.value === "") {
          //
          isNull = true;
          break;
        }
      }
    }
    if (isNull) {
      //
      alert("빈 값이 있으면 등록이 불가합니다.\n(혹은 숫자로 올바르게 입력했는지 확인해주세요.)");
      return true;
    }
    return false;
  }
};
export default InputProduct;
