import React from "react";
import * as S from "./SocialShareButtonsStyled";
import { SocialShareIcons } from "./assets";
import { ISocialShare } from "../../../models/socialshare.model";

const ShareBtn = ({ icon, name, url }: ISocialShare) => (
  <S.ShareLink href={url} target="_blank">
    <S.SocialIcon src={icon} alt={name} />
  </S.ShareLink>
);

const SocialShareButtons = () => (
  <S.SocialShareContainer>
    <S.Title>
      Siga a gente nas redes sociais e fique por dentro das novidades!
    </S.Title>
    <S.SocialButtons>
      {SocialShareIcons.map((socialIcon) => (
        <ShareBtn key={socialIcon.name} {...socialIcon} />
      ))}
    </S.SocialButtons>
  </S.SocialShareContainer>
);

export default SocialShareButtons;
