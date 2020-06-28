import React, { useState } from "react";
import { useFormikContext } from "formik";

import { Button } from "../../../../../elements/Button";
import * as S from "./AvailableTimeStyled";

import { CardOption } from "../../../../../modules";
import { getImage } from "../../../../../../shared/img";

interface IProps {
  nextStep?: Function;
  previousStep?: Function;
}

const AvailableTime: React.FC<IProps> = ({
  nextStep = () => {},
  previousStep = () => {},
}) => {
  const { setFieldValue } = useFormikContext();

  const [availableTime, setAvailableTime] = useState("yes");

  const handleIsStudentStatus = (value: any) => {
    setFieldValue("availableTime", value);
  };

  const handlePrev = () => {
    previousStep();
  };
  const handleNext = () => {
    nextStep();
    handleIsStudentStatus((availableTime === "yes"));
  };
  return (
    <S.AvailableTimeWrapper>
      <S.PageHeader>
        Para terminar, uma informação importante: as aulas serão às terças e quintas, de 19h30 às 21h30. Você tem disponibilidade nesses dias e horário?
      </S.PageHeader>
      <S.Options>
        <CardOption
          image={getImage("finalSim")}
          value="yes"
          setValue={() => setAvailableTime("yes")}
          selected={availableTime}
        />
        <CardOption
          image={getImage("finalNao")}
          value="not"
          setValue={() => setAvailableTime("not")}
          selected={availableTime}
        />
      </S.Options>
      <S.ButtonsContainer>
        <Button onClick={handlePrev} variant="outlined">Voltar</Button>
        <Button onClick={handleNext}>Avançar</Button>
      </S.ButtonsContainer>
    </S.AvailableTimeWrapper>
  );
};

export default AvailableTime;
