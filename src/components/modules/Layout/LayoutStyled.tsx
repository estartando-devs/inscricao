import styled from "styled-components";

const LayoutContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const LayoutContent = styled.div`
  background-color: ${(props) => props.theme.palette.background.default};
  margin: 0 auto;
  width: 100%;
  height: auto;
  min-height: 100%;
  max-width: 780px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: ${(props) => props.theme.shadows[2]};
`;

export { LayoutContainer, LayoutContent };
