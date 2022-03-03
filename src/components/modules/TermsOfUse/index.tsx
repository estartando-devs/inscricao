import React, { useState } from "react";
import ReactDOM from "react-dom";
import { TERMS_OF_USE_URL } from "../../../utils/constants/termsURL";
import { Button } from "../../elements";
import * as S from "./styles";

const TermsOfUse = () => {
  const isAcceptTerms = localStorage.getItem("accept") === "true";
  const [acceptTerms, setAcceptTerms] = useState(isAcceptTerms);

  const handleClickAcceptTerms = () => {
    setAcceptTerms((prev) => !prev);
    localStorage.setItem("accept", "true");
  };

  return (
    ReactDOM.createPortal(
      <>
        {!acceptTerms && (
        <S.Overlay>
          <S.SectionContainer>
            <S.HeadingSection>
              <h2>Termos de Uso</h2>
              <small>
                Para visualizar os termos de uso:
                {" "}
                <a href={TERMS_OF_USE_URL}>
                  Clique aqui!
                </a>
              </small>
            </S.HeadingSection>
            <S.ContentAccept>
              <small>
                Ao clicar em &apos;Aceitar&apos; você concorda com nossos termos de uso.
              </small>
              <Button onClick={handleClickAcceptTerms}>
                Aceitar
              </Button>
            </S.ContentAccept>
          </S.SectionContainer>
        </S.Overlay>
        )}
      </>,
      document.getElementById("modal-root") as HTMLElement,
    )
  );
};

export { TermsOfUse };
