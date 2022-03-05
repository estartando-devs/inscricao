import styled from "styled-components";
import { Form } from "formik";
import media from "styled-media-query";

export const AvailableTimeWrapper = styled(Form)`
  /* height: 100%; */
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
  display: flex;
  justify-content: center;
  padding: 24px;
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
  ${media.greaterThan("medium")`
    gap: 112px;
  `}
  &>* {
    margin: 0 10px;
  }
`;

export const CardError = styled.div`
  width: 80%;
  max-width: 300px;
  margin: 20px auto;
  padding: 20px;
  background-color: ${(props) => props.theme.palette.error.main};
`;

export const CardErrorMessage = styled.p`
  width: 100%;
  text-align: center;
  color: ${(props) => props.theme.palette.error.contrastText};
`;

export const TermsOfUse = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  ${media.lessThan("medium")`
    padding: 30px;
  `}
  a {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;
