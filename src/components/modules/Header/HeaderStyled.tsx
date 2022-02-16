import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 100%;
  display: flex;
  background-color: ${(props) => props.theme.palette.background.default};
  min-height: 88px;
`;

export const SideContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TitleContainer = styled(SideContent)`
  z-index: 2;
  background-color: ${(props) => props.theme.palette.primary.main};
`;

export const HeaderTitle = styled.h1`
  color: ${(props) => props.theme.palette.primary.contrastText};
  font-size: 1.8rem;
  text-align: center;
  font-family: "Ubuntu Mono", monospace;
  margin-left: -30px;
`;

export const Separator = styled.span`
  background-color: #81caa8;
  width: 60px;
  margin-top: -75px;
  transform: rotate(140deg);
`;
