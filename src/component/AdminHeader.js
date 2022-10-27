import { RowFlexDiv, HeaderSpan } from "../styledComponent";
import { useNavigate } from "react-router-dom";
//
const AdminHeader = () => {
  //
  const nav = useNavigate();
  //
  return (
    <RowFlexDiv>
      <HeaderSpan onClick={() => nav("/addProduct")}>Add Product</HeaderSpan>
      <HeaderSpan
        onClick={() => {
          alert("회원 관리 페이지는 구현 예정입니다.");
          nav("/");
        }}
      >
        Users
      </HeaderSpan>
    </RowFlexDiv>
  );
};
export default AdminHeader;
