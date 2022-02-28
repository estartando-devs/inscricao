import styled from "styled-components";
import { Field } from "formik";

export const TextArea = styled(Field)`
  /* background-color: ${(props) => props.theme.palette.background.paper}; */
  background-color: transparent;
  padding: 9px 8px;
  border: none;
  border-radius: 5px;
  min-width: ${(props) => props.width || "254px"};
  height: ${(props) => props.width || "155px"};
  max-width: 380px;
  color: ${(props) => props.theme.palette.text.primary};
  border-color: ${(props) =>
    props.error
      ? props.theme.palette.error.main
      : props.theme.palette.background.paper};
  ::placeholder {
    color: ${(props) => props.theme.palette.grey[400]};
  }
  :focus {
    border-color: ${(props) => props.theme.palette.primary.main};
    outline: none;
  }
`;
