import React, { useState, useEffect } from "react";
import * as S from "./CardOptionStyled";

interface ICardOption {
  image: string;
  label: string;
  isSelected: boolean;
}

const CardOption = ({ image, label, isSelected }: ICardOption) => {
  const [selected, setSelected] = useState(false);

  const toogleSelect = () => setSelected(!selected);

  useEffect(() => setSelected(isSelected), [isSelected]);

  return (
    <S.CardContainer>
      <S.Card selected={selected} onClick={toogleSelect}>
        <S.CardImage src={image} alt={label} />
      </S.Card>
      <S.CardDescription>{label}</S.CardDescription>
    </S.CardContainer>
  );
};

export default CardOption;
