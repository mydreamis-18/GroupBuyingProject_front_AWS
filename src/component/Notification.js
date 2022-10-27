import { RowFlexDiv, SmallSpan, LargeSpan } from "../styledComponent";
//
const Notification = (props) => {
  //
  const { message, created_at } = props.notification;
  //
  return (
    <RowFlexDiv>
      <LargeSpan>{message}</LargeSpan>
      <SmallSpan>{created_at}</SmallSpan>
    </RowFlexDiv>
  );
};
export default Notification;
