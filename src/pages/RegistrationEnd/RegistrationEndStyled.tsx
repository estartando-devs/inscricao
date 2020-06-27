import styled from "styled-components";

const RegistrationEndContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const FinalImage = styled.img`
  width: 230px;
  height: auto;
`;

const FinalMessage = styled.h1`
  margin: 50px 0;
  text-align: center;
  font-family: ${(props) => props.theme.typography?.h1?.fontFamily || ""};
`;

export { RegistrationEndContainer, FinalImage, FinalMessage };
