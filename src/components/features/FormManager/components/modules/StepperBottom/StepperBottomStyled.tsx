import styled from "styled-components";

export const Container = styled.div``;

export const ButtonsContainer = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    900deg,
    rgba(16, 16, 16, 0.8) 0%,
    rgba(16, 16, 16, 1) 50%,
    rgba(16, 16, 16, 1) 100%
  );
  display: flex;
  justify-content: center;
  padding: 24px;
  z-index: 100;
  & > * {
    margin: 0 10px;
  }
`;
