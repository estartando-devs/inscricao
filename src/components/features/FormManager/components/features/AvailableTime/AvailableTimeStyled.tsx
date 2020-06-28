import styled from "styled-components";
import { Form } from "formik";
import media from "styled-media-query";

export const AvailableTimeWrapper = styled(Form)`
  height: 100%;
  display: grid;
  grid-template-rows: auto 4fr 1fr;
  ${media.greaterThan("medium")`
    grid-template-rows: 60px 6fr 1fr;
  `}
`;

export const PageHeader = styled.h2`
  text-align: center;
  font-size: 16px;
  line-height: 22px;
  padding: 0 24px;
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
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
    margin: auto;
    padding: 24px;
  ${media.greaterThan("medium")`
    gap: 112px;
  `}
`;
