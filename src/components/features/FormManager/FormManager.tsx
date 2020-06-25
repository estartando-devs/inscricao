import React from "react";

import * as S from "./FormManagerStyled";
import Stepper from "./components/modules/Stepper/Stepper";

const FormManager = () => {
  return (
    <S.FormManagerContainer>
      <S.StepWizardStyled nav={<Stepper />} isHashEnabled={true}>
        <div>form 1</div>
        <div>form 2</div>
        <div>form 3</div>
        <div>form 4</div>
      </S.StepWizardStyled>
    </S.FormManagerContainer>
  );
};

export default FormManager;
