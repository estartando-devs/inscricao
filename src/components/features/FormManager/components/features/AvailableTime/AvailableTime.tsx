import React from "react";
import { useFormikContext, useField } from "formik";

import { Button } from "../../../../../elements/Button";
import * as S from "./AvailableTimeStyled";

import { CardOption } from "../../../../../modules";
import { getImage } from "../../../../../../shared/img";

interface IProps {
  nextStep?: Function;
  previousStep?: Function;
}

const AvailableTime: React.FC<IProps> = ({ previousStep = () => {} }) => {
  const {
    setFieldValue,
    submitForm,
    isValid,
    dirty,
    isSubmitting,
  } = useFormikContext();
  const [, { value }] = useField("availableTime");

  const isReadyToSubmit = isValid && dirty;

  const handleIsStudentStatus = (_value: string | number | boolean) => {
    setFieldValue("availableTime", _value);
  };

  const handlePrev = () => {
    previousStep();
  };

  const handleNext = () => {
    submitForm();
  };

  return (
    <S.AvailableTimeWrapper>
      <S.PageHeader>
        Para terminar, uma informação importante: as aulas serão às terças e
        quintas, de 19h30 às 21h30. Você tem disponibilidade nesses dias e
        horário?
      </S.PageHeader>
      <S.Options>
        <CardOption
          image={getImage("finalSim")}
          value
          setValue={handleIsStudentStatus}
          selected={value}
        />
        <CardOption
          image={getImage("finalNao")}
          value={false}
          setValue={handleIsStudentStatus}
          selected={value}
        />
      </S.Options>
      <S.ButtonsContainer>
        <Button onClick={handlePrev} variant="outlined">
          Voltar
        </Button>
        <Button
          isLoading={isSubmitting}
          disabled={!isReadyToSubmit}
          type="button"
          onClick={handleNext}
        >
          Finalizar
        </Button>
      </S.ButtonsContainer>
    </S.AvailableTimeWrapper>
  );
};

export default AvailableTime;
