import React from "react";
import * as S from "./HeaderStyled";
import { Logo } from "../../elements";

const Header = () => {
  const year = new Date().getFullYear();

  return (
    <S.HeaderContainer>
      <S.SideContent>
        <Logo width="125px" />
      </S.SideContent>
      <S.Separator />
      <S.TitleContainer>
        <S.HeaderTitle>{`Inscrições ${year}`}</S.HeaderTitle>
      </S.TitleContainer>
    </S.HeaderContainer>
  );
};

export default Header;
