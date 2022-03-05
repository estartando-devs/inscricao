import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Button } from "../../elements";
import * as S from "./styles";

export const Requirments = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return ReactDOM.createPortal(
    <>
    {isOpen && (<S.Overlay>
      <S.SectionContainer>
        <h2>Para se inscrever você precisa:</h2><br/>
          <ul>
            <li> Estar cursando ou ter concluído o 3º ano do ensino médio;</li>
            <li>
              Morar <strong> em qualquer lugar do Brasil</strong>;
            </li>
            <li>
              Possuir renda familiar per capta de{" "}
              <strong>até meio salário mínimo </strong>(R$ 606,00 por pessoa
              residente na casa) ou possuir renda familiar total de{" "}
              <strong>até três salários mínimos</strong>;
            </li>
          </ul>
          <Button onClick={(handleClick)}>Fechar</Button>
      </S.SectionContainer>
    </S.Overlay>)}
    </>,
    document.getElementById("modal-root") as HTMLElement
  );
};
