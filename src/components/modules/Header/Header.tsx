import React from 'react';
import * as S from './HeaderStyled'
import { Logo } from '../../elements';

const Header = () => {
  return (
    <S.HeaderContainer>
      <Logo />
    </S.HeaderContainer>
  );
};

export default Header;