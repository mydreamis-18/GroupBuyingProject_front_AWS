import styled from "styled-components";
//
const ColumnFlexDiv = styled.div`
  border: 1px solid black;
  justify-content: center;
  flex-direction: column;
  border-radius: 20px;
  align-items: center;
  margin: 2vw 1vw;
  display: flex;
`;
const RowFlexDiv = styled.div`
  justify-content: space-evenly;
  flex-direction: row;
  border-radius: 20px;
  align-items: center;
  display: flex;
  margin: 1vw;
`;
const TitleP = styled.p`
  text-align: center;
  font-weight: 900;
  font-size: 3vw;
  margin: 1vw 0;
`;
const LeftP = styled.p`
  font-size: 2.5vw;
  margin: 1vw 0;
`;
const LoadingMsgP = styled.p`
  text-align: center;
  font-weight: 900;
  margin-top: 40vh;
  font-size: 10vh;
`;
const HeaderSpan = styled.span`
  font-weight: 900;
  font-size: 3vw;
`;
const SmallSpan = styled.span`
  text-align: center;
  font-size: 1.5vw;
  width: 15vw;
`;
const LargeSpan = styled.span`
  text-align: center;
  font-size: 1.5vw;
  width: 60vw;
`;
const SmallLabel = styled.label`
  font-size: 1.2vw;
  padding: 0.5vw;
`;
const BigLabel = styled.label`
  font-size: 3vw;
  padding: 1vw;
`;
const Button = styled.button`
  padding: 0.2vw;
  margin: 1vw;
`;
const AddProductImg = styled.img`
  width: 10vw;
`;
const HeaderLineDiv = styled.div`
  background-color: black;
  margin: 0 auto 3vh auto;
  height: 0.5vh;
  width: 80%;
`;
export {
  //
  ColumnFlexDiv,
  AddProductImg,
  LoadingMsgP,
  RowFlexDiv,
  SmallLabel,
  HeaderSpan,
  LargeSpan,
  SmallSpan,
  BigLabel,
  HeaderLineDiv,
  Button,
  TitleP,
  LeftP,
};
