import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

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
    message: `Sua inscrição foi confirmada!
    Fique atento ao seu email e telefone para acompanhar as próximas etapas.`,
  },
  canceled: {
    image: images.inscricaoCancelada,
    message: "Esperamos você na próxima!",
  },
};

const RegistrationEnd = ({ status = "confirmed" }: IRegistrarionEnd) => {
  const finalMessage = messagesOptions[status];

  const { state } = useLocation();
  const history = useHistory();

  useEffect(() => {
    console.log(state);
    if (!state) {
      history.push("/");
    }
  }, [state, history]);

  return (
    <S.RegistrationEndContainer>
      <S.FinalImage src={finalMessage.image} alt={finalMessage.message} />
      <S.FinalMessage>{finalMessage.message}</S.FinalMessage>
      <SocialShareButtons />
    </S.RegistrationEndContainer>
  );
};

export default RegistrationEnd;
