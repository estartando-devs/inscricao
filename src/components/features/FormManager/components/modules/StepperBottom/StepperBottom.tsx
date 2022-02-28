import React from "react";

import * as S from "./StepperBottomStyled";
import { Button } from "../../../../../elements";

interface IStepperBottom {
  handlePrev: Function;
  handleNext: Function;
  onSubmit?: Function;
  canSubmit?: boolean;
  isFirst?: boolean;
  isLoading?: boolean;
}

const StepperBottom: React.FC<IStepperBottom> = ({
  handlePrev,
  handleNext,
  canSubmit,
  isFirst,
  onSubmit = () => {},
  isLoading,
}) => {
  const nextStep = () => {
    if (canSubmit) {
      onSubmit();
    } else {
      handleNext();
    }
  };
  const prevStep = () => {
    handlePrev();
  };
  return (
    <S.ButtonsContainer>
      <Button disabled={isFirst} onClick={prevStep} variant="outlined">
        Voltar
      </Button>
      <Button onClick={nextStep} isLoading={isLoading}>
        {canSubmit ? "Finalizar" : "Continuar"}
      </Button>
    </S.ButtonsContainer>
  );
};

export default StepperBottom;
