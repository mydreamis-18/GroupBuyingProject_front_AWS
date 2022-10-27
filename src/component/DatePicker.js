import "react-datepicker/dist/react-datepicker.css";
import { SmallLabel } from "../styledComponent";
import DatePicker from "react-datepicker";
//
const _DatePicker = (props) => {
  //
  const [toZeroSecondFn] = props.fn;
  const [startDate, setStartDate, endDate, setEndDate] = props.stateArr;
  //
  // ㅜ onChange() 함수와 state 값을 사용하지 않으면 값이 변동되지 않음
  return (
    <>
      <SmallLabel>공동 구매 시작 시각 </SmallLabel>
      <DatePicker selected={startDate} onChange={(date) => dateValidationFn(date, "start")} minDate={toZeroSecondFn(new Date())} timeInputSmallLabel="Time:" dateFormat="yyyy년 MM월 dd일 h:mm aa" showTimeInput />
      <br />
      <SmallLabel>공동 구매 종료 시각 </SmallLabel>
      <DatePicker selected={endDate} onChange={(date) => dateValidationFn(date, "end")} minDate={startDate} timeInputSmallLabel="Time:" dateFormat="yyyy년 MM월 dd일 h:mm aa" showTimeInput />
    </>
  );
  ///////////////////////////////////////////////////////////////////////////////
  /**
   * 현재 이후의 시간을 선택하도록 날짜 및 시간에 대한 유효성을 체크하는 함수 10.12.14
   * @param {object} date
   * @param {string} str
   */
  function dateValidationFn(date, str) {
    //
    // ㅜ 실시간으로 선택한 값을 사용하는 데에는 startDate 값이 아닌 date 값을 사용해야 함
    let now = toZeroSecondFn(new Date());
    //
    const selectedTime = toZeroSecondFn(date);
    const hourCheck = now.getHours() > selectedTime.getHours();
    const minuteCheck = now.getHours() === selectedTime.getHours() && now.getMinutes() > selectedTime.getMinutes();
    const isToday = now.getFullYear() + now.getMonth() + now.getDate() === selectedTime.getFullYear() + selectedTime.getMonth() + selectedTime.getDate();
    //

    if ((isToday && hourCheck) || (isToday && minuteCheck)) {
      //
      alert("현재보다 이전 시간은 선택할 수 없습니다.");
      now = toZeroSecondFn(new Date());
      //
      //
      if (str === "start") {
        //
        setStartDate(now);
      }
      //
      else if (str === "end") {
        //
        setEndDate(now);
      }
      return;
    }
    if (str === "start") {
      //
      setStartDate(selectedTime);
      //
      const isBig = selectedTime > endDate;
      if (isBig) {
        //
        setEndDate(selectedTime);
      }
    }
    //
    else if (str === "end") {
      //
      setEndDate(selectedTime);
    }
  }
};
export default _DatePicker;
