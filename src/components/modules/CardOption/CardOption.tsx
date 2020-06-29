import React from "react";
import * as S from "./CardOptionStyled";

interface ICardOption {
  image: string;
  label?: string;
  value: string;
  selected?: string;
  setValue: (value: string) => void;
}

const CardOption = ({
  image,
  label,
  value,
  selected,
  setValue,
}: ICardOption) => {
  const isSelected = value === selected;

  return (
    <S.CardContainer>
      <S.CardImage
        selected={isSelected}
        onClick={() => setValue(value)}
        src={image}
        alt={label}
      />
      {label && <S.CardDescription>{label}</S.CardDescription>}
    </S.CardContainer>
  );
};

export default CardOption;
