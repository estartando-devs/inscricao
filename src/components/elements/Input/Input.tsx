import React from "react";
import { useFormikContext } from "formik";
import * as S from "./InputStyled";
import { masks, typeMask } from "../../../utils/masks";

interface InputProps {
  label: string;
  width?: string;
  type: string;
  name: string;
  mask?: typeMask;
}

const Input: React.FC<InputProps> = ({ label, type, name, mask }) => {
  const { setFieldValue } = useFormikContext();
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
