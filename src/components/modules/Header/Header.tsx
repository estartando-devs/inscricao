import React from "react";
import * as S from "./HeaderStyled";
import { Logo } from "../../elements";
import { currentYear } from "../../../utils/currentYear";

export const Header = () => (
  <S.HeaderContainer>
    <S.SideContent>
      <Logo width="125px" />
    </S.SideContent>
    <S.Separator />
    <S.TitleContainer>
      <S.HeaderTitle>{`Inscrições ${currentYear}`}</S.HeaderTitle>
    </S.TitleContainer>
  </S.HeaderContainer>
);
