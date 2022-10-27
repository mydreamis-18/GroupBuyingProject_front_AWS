import { TitleP, RowFlexDiv, SmallSpan, LargeSpan } from "../styledComponent";
import { MyPageHeader, Notification } from "../component";
import { useSelector } from "react-redux";
// import { useEffect } from "react";
//
const MyPage = () => {
  //
  let _notifications = "도착한 알림 쪽지가 없습니다.";
  const nickname = useSelector((state) => state.user_reducer.nickname);
  const notifications = useSelector((state) => state.user_reducer.notifications);
  //
  if (notifications.length !== 0) {
    //
    _notifications = [...notifications].map((el) => <Notification notification={el}></Notification>);
  }
  //
  // ㅜ useEffect() 함수는 랜더링 이후에 이루어지기 때문에 변수의 값이 변경되기는 하지만 일반 변수라서 리랜더링이 되지 않기 때문에 적용이 안되는 것...
  // useEffect(() => {
  //   //
  //   if (notifications.length !== 0) {
  //     //
  //     _notifications = [...notifications].map((el) => <Notification notification={el}></Notification>);
  //   }
  // }, [notifications]);
  //
  return (
    <>
      <MyPageHeader></MyPageHeader>
      <TitleP>{nickname}님의 알림 쪽지함</TitleP>
      <RowFlexDiv>
        <LargeSpan>내용</LargeSpan>
        <SmallSpan>시간</SmallSpan>
      </RowFlexDiv>
      {_notifications}
    </>
  );
};
export default MyPage;
