import React from "react";

import * as S from "./StepperStyled";
import { StepperProps } from "react-step-wizard";

const Stepper: React.FC<StepperProps> = ({ goToStep = () => {} }) => {
  return (
    <S.Container>
      <S.StepIndicatorContainer onClick={() => goToStep(1)}>
        1
      </S.StepIndicatorContainer>
      <S.StepIndicatorContainer onClick={() => goToStep(2)}>
        2
      </S.StepIndicatorContainer>
      <S.StepIndicatorContainer onClick={() => goToStep(3)}>
        3
      </S.StepIndicatorContainer>
      <S.StepIndicatorContainer onClick={() => goToStep(4)}>
        4
      </S.StepIndicatorContainer>
    </S.Container>
  );
};

export default Stepper;
