import styled from "styled-components";
import { Form } from "formik";
import media from "styled-media-query";

export const IsStudentWrapper = styled(Form)`
  height: 100%;
  display: grid;
  grid-template-rows: 30px 4fr 1fr;
  ${media.greaterThan("medium")`
    grid-template-rows: 60px 6fr 1fr;
  `}
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
  display: flex;
  justify-content: center;
  padding: 24px;
  & > * {
    margin: 0 10px;
  }
`;
