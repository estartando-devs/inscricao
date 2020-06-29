import React from "react";
import * as S from "./RegistrationEndStyled";
import { SocialShareButtons } from "../../components/modules";
import images from "../../shared/img";
import { useLocation } from "react-router-dom";

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

const RegistrationEnd = ({ status = "confirmed" }: IRegistrarionEnd) => {
  const finalMessage = messagesOptions[status];

  const { state } = useLocation();

  console.log("state :: ", state);

  return (
    <S.RegistrationEndContainer>
      <S.FinalImage src={finalMessage.image} alt={finalMessage.message} />
      <S.FinalMessage>{finalMessage.message}</S.FinalMessage>
      <SocialShareButtons />
    </S.RegistrationEndContainer>
  );
};

export default RegistrationEnd;
