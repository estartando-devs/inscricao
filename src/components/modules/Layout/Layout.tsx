import React, { PropsWithChildren, ReactNode } from "react";
import * as S from "./LayoutStyled";
import { Header } from "../Header";
import { TermsOfUse } from "../TermsOfUse";

export const Layout = ({ children }: PropsWithChildren<ReactNode>) => (
  <>
    <TermsOfUse />
    <S.LayoutContainer>
      <S.LayoutContent>
        <Header />
        {children}
      </S.LayoutContent>
    </S.LayoutContainer>
  </>
);
