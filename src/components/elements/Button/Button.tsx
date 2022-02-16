import React from "react";
import ReactLoading from "react-loading";
import { IButton } from "./IButton";
import * as S from "./ButtonStyled";

export const Button = ({
  variant = "default",
  size = "small",
  isLoading = false,
  children,
  type = "button",
  ...rest
}: IButton) => (
  <S.ButtonContainer
    type={type}
    variant={variant}
    size={size}
    isLoading={isLoading}
    {...rest}
  >
    {isLoading ? (
      <ReactLoading type="spokes" height="20px" width="20px" />
    ) : (
      children
    )}
  </S.ButtonContainer>
);
