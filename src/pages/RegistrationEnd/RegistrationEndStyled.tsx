import styled from "styled-components";

export const RegistrationEndContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const FinalImage = styled.img`
  width: 230px;
  height: auto;
`;

export const FinalMessage = styled.h3`
  margin: 50px 0;
  text-align: center;
  font-family: ${(props) => props.theme.typography?.h1?.fontFamily || ""};
`;
