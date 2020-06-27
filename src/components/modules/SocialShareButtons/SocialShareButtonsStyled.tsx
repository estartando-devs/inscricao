import styled from "styled-components";

const Title = styled.p`
  color: ${(props) => props.theme.palette.text.secondary};
  line-height: 19px;
  text-align: center;
  max-width: 280px;
  margin: 15px 0;
`;

const SocialButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;

const ShareLink = styled.a`
  margin: 0 30px;
`;

const SocialIcon = styled.img`
  width: 85px;
  height: auto;
`;

export { Title, SocialButtonsContainer, ShareLink, SocialIcon };
