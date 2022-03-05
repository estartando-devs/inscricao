import React from "react";
import { Link } from "react-router-dom";
import * as S from "./styles";
import LogoImage from "./assets/logo-devs.svg";

export type LogoProps = {
  width: string;
  height?: string;
  padding?: string;
  margin?: string;
}

export const Logo = (props: LogoProps = {
  width: "150px",
  height: "auto",
  padding: "0",
  margin: "0",
}) => (
  <Link to="/">
    <S.LogoContainer
      src={LogoImage}
      {...props}
    />
  </Link>
);
