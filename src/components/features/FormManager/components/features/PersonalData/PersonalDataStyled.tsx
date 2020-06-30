import styled from "styled-components";
import media from "styled-media-query";

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
  & > * {
    margin: 0 10px;
  }
  justify-content: flex-end;
  ${media.greaterThan("medium")`
    justify-content: center;
  `}
  padding: 24px;
`;

export const PersonalDataWrapper = styled.div`
  padding-bottom: 96px;
`;
