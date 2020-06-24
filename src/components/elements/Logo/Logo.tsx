import React from 'react';
import * as S from './LogoStyled'
import { Link } from 'react-router-dom';
// import LogoImage from "./assets/logo.svg";

interface LogoProps {
  width: string;
  height: string;
  padding: string;
  margin: string;
};

const LogoDefaultProps: LogoProps = {
  width: "150px",
  height: "auto",
  padding: "0",
  margin: "0",
}

const Logo = ({ width, height, padding, margin }: LogoProps) => {

  return (
    <Link to="/">
      <S.LogoContainer
        src="https://estartandodevs.com.br/src/img/logo.png"
        width={width}
        height={height}
        padding={padding}
        margin={margin}
      />
    </Link>
  );
};

Logo.defaultProps = LogoDefaultProps;

export default Logo;