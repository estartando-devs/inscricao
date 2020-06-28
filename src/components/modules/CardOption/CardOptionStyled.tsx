import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface ICard {
  selected: boolean;
}

const Card = styled.div<ICard>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  background: #fff;
  border-radius: 5px;
  box-shadow: ${(props) => props.theme.shadows[1]};
  border: 4px solid transparent;
  border-color: ${(props) =>
    props.selected && `${props.theme.palette.primary.main}`};
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
`;

const CardDescription = styled.p`
  max-width: 140px;
  text-align: center;
  padding: 10px 5px 0;
`;

export {
  CardContainer,
  Card,
  CardImage,
  CardDescription,
};
