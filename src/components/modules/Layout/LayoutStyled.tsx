import styled from "styled-components";

const LayoutContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const LayoutContent = styled.div`
  background-color: ${(props) => props.theme.palette.background.default};
  margin: 0 auto;
  width: 100%;
  height: 100%;
  max-width: 780px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.3),
    -5px -5px 8px rgba(123, 122, 122, 0.2); */
`;

export { LayoutContainer, LayoutContent };
