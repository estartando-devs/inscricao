import React, { useState } from "react";
import { useFormikContext } from "formik";

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

  const [studentStatus, setStudentStatus] = useState("noStudent");

  const handleIsStudentStatus = (value: any) => {
    setFieldValue("isStudent", value);
  };

  const handlePrev = () => {
    previousStep();
  };
  const handleNext = () => {
    nextStep();
    handleIsStudentStatus((studentStatus === "isStudent"));
  };
  return (
    <S.IsStudentWrapper>
      <S.PageHeader>
        Em qual perfil você se encaixa?
      </S.PageHeader>
      <S.Options>
        <CardOption
          image={getImage("students")}
          value="isStudent"
          setValue={() => setStudentStatus("isStudent")}
          label="Estou no 3º ano do ensino médio"
          selected={studentStatus}
        />
        <CardOption
          image={getImage("perfilFormado")}
          value="noStudent"
          setValue={() => setStudentStatus("noStudent")}
          label="já concluí o ensino médio"
          selected={studentStatus}
        />
      </S.Options>
      <S.ButtonsContainer>
        <Button onClick={handlePrev} variant="outlined">Voltar</Button>
        <Button onClick={handleNext}>Avançar</Button>
      </S.ButtonsContainer>
    </S.IsStudentWrapper>
  );
};

export default IsStudent;
