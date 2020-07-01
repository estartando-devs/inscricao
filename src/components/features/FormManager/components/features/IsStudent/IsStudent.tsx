import React from "react";
import { useFormikContext, useField } from "formik";

import { Button } from "../../../../../elements/Button";
import * as S from "./IsStudentStyled";

import { CardOption } from "../../../../../modules";
import { getImage } from "../../../../../../shared/img";

interface IProps {
  nextStep?: Function;
  previousStep?: Function;
}

const IsStudent: React.FC<IProps> = ({
  nextStep = () => {},
  previousStep = () => {},
}) => {
  const { setFieldValue } = useFormikContext();

  const [, { value }] = useField("isStudent");

  const handleIsStudentStatus = (_value: any) => {
    setFieldValue("isStudent", _value);
  };

  const handlePrev = () => {
    previousStep();
  };
  const handleNext = () => {
    nextStep();
  };
  return (
    <S.IsStudentWrapper>
      <S.PageHeader>Em qual perfil você se encaixa?</S.PageHeader>
      <S.Options>
        <CardOption
          image={getImage("students")}
          value
          setValue={handleIsStudentStatus}
          label="Estou no 3º ano do ensino médio"
          selected={value}
        />
        <CardOption
          image={getImage("perfilFormado")}
          value={false}
          setValue={handleIsStudentStatus}
          label="Já concluí o ensino médio"
          selected={value}
        />
      </S.Options>
      <S.ButtonsContainer>
        <Button onClick={handlePrev} variant="outlined">
          Voltar
        </Button>
        <Button onClick={handleNext}>Continuar</Button>
      </S.ButtonsContainer>
    </S.IsStudentWrapper>
  );
};

export default IsStudent;
