import React from "react";
import * as S from "./RegistrationEndStyled";
import { SocialShareButtons } from "../../components/modules";
import images from "../../shared/img";

interface IRegistrarionEnd {
  status: "confirmed" | "canceled";
}

interface IFinalMessage {
  image: string;
  message: string;
}

interface IMessagesOptions {
  confirmed: IFinalMessage;
  canceled: IFinalMessage;
}

const messagesOptions: IMessagesOptions = {
  confirmed: {
    image: images.inscricaoConfirmada,
    message: "Sua inscrição foi confirmada!",
  },
  canceled: {
    image: images.inscricaoCancelada,
    message: "Esperamos você na próxima!",
  },
};

const RegistrationEnd = ({ status = "canceled" }: IRegistrarionEnd) => {
  const finalMessage = messagesOptions[status];

  return (
    <S.RegistrationEndContainer>
      <S.FinalImage src={finalMessage.image} alt={finalMessage.message} />
      <S.FinalMessage>{finalMessage.message}</S.FinalMessage>
      <SocialShareButtons />
    </S.RegistrationEndContainer>
  );
};

export default RegistrationEnd;
