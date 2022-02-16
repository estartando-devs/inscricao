import styled, { css } from "styled-components";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface ICard {
  selected: boolean;
}

const CardImage = styled.img<ICard>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  border-radius: 8px;
  border: 4px solid transparent;
  transition: all 0.2s ease-in;
  background-size: cover;
  object-fit: cover;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8),
    -1px -1px 3px rgba(123, 122, 122, 0.3);
  ${(props) => props.selected
    && css`
      border-color: ${props.theme.palette.primary.main};
      transform: scale(1.05);
    `}
`;

const CardDescription = styled.p`
  max-width: 140px;
  text-align: center;
  padding: 10px 5px 0;
`;

export { CardContainer, CardImage, CardDescription };
