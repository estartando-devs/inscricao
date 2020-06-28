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
`;

export const TestimonyTitle = styled(PageHeader)`
  padding: 0 45px 25px;
  max-width: 580px;
`;

export const TestimonyBox = styled.div`
  /* background-image: url(${getImage("textAreaGreen")});
  background-repeat: no-repeat;
  background-size: contain; */
`;

export const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  margin: auto;
  padding: 24px;
  ${media.greaterThan("medium")`
    gap: 112px;
  `}
`;
