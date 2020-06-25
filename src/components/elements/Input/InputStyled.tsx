import styled from "styled-components";
import { ErrorMessage, Field } from "formik";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled(Field)`
  background-color: ${(props) => props.theme.palette.background.paper};
  border: none;
  padding: 9px 8px;
  border-radius: 5px;
  width: ${(props) => props.width};
  color: ${(props) => props.theme.palette.text.primary};
  :focus {
    outline: none;
  }
`;

const Label = styled.label`
  margin: 3px 10px;
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.palette.text.primary};
`;

const HintLabel = styled.span`
  margin: 3px 0;
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => props.theme.palette.text.primary};
`;

const ErrorMessageStyled = styled(ErrorMessage)`
  position: absolute;
  bottom: -15px;
  right: 0px;
  color: ${(props) => props.theme.palette.primary.error};
  font-family: "Montserrat";
  font-size: 10px;
`;

export { InputContainer, Input, Label, HintLabel, ErrorMessageStyled };
