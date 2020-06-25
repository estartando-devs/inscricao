import React from "react";
import * as S from "./InputStyled";
import { Field, useFormikContext } from "formik";
import { masks } from "../../../utils/masks";
import { typeMask } from "../../../utils/masks";
interface InputProps {
  label: string;
  width?: string;
  hintLabel?: string;
  type: string;
  name: string;
  mask?: typeMask;
}

const Input: React.FC<InputProps> = ({
  label,
  width = "100%",
  hintLabel = "",
  type,
  name,
  mask,
}) => {
  const { values, setFieldValue, errors } = useFormikContext();
  const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const maskedValue = masks[mask || "standard"](target?.value || "");
    setFieldValue(name, maskedValue);
  };

  return (
    <S.InputContainer>
      <S.Label>{label}</S.Label>
      <S.Input
        placeholder=""
        type={type}
        name={name}
        error={false}
        onChange={(e: Event) => handleChange(e)}
      />
      <S.ErrorMessageStyled name={name} component="div" />
    </S.InputContainer>
  );
};

export default Input;
