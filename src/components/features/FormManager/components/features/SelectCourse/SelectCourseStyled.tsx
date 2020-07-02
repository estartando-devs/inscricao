import styled from "styled-components";
import { Form } from "formik";
import media from "styled-media-query";
import { getImage } from "../../../../../../shared/img";

export const SelectCourseWrapper = styled(Form)`
  height: 100%;
  display: grid;
  grid-template-rows: 30px auto 2fr 40px;
`;

export const PageHeader = styled.h2`
  text-align: center;
  font-size: 16px;
  line-height: 22px;
  ${media.greaterThan("medium")`
    font-size: 20px;
    line-height: 27px;
    margin: auto;
  `}
`;

export const Options = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 24px;
  ${media.greaterThan("medium")`
    gap: 64px;
    margin: 0 auto;
  `}
`;

export const TestimonyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const TestimonyTitle = styled(PageHeader)`
  padding: 0 45px 25px;
  max-width: 580px;
`;

export const TestimonyBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${getImage("textAreaBlack")});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center 0px;
  margin-bottom: 100px;
  padding: 10px 0 60px 0;
`;

export const GreenBalloon = styled.div`
  height: 178px;
  width: 212px;
  background-image: url(${getImage("textAreaGreen")});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  position: absolute;
  bottom: 100px;
  right: -32px;
  z-index: -1;
`;

export const ButtonsContainer = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    900deg,
    rgba(16, 16, 16, 0.8) 0%,
    rgba(16, 16, 16, 1) 50%,
    rgba(16, 16, 16, 1) 100%
  );

  padding: 24px;
  display: flex;
  justify-content: center;
  padding: 24px;
  & > * {
    margin: 0 10px;
  }
`;
