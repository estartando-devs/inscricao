import React, { useEffect, useImperativeHandle } from "react";
import { StepperProps } from "react-step-wizard";

import * as S from "./StepperStyled";
import images from "../../../../../../shared/img";

interface StepProps {
  action: Function;
  step: number;
  status: Array<boolean>;
  totalSteps: number;
  isActive: boolean;
}

const isDisabled = (step: number, status: Array<boolean>) => !(status[step - 1] || status[step]);

const Step: React.FC<StepProps> = ({
  action,
  step,
  status,
  totalSteps,
  isActive,
}) => {
  const disabled = isDisabled(step, status);
  const showDivisor = totalSteps > step;
  const handleClick = () => {
    if (!disabled) {
      action(step);
    }
  };
  const generateKey = (_step: number, _disabled: boolean) => `step${_step}${_disabled ? "Disabled" : ""}`;
  return (
    <>
      <S.StepIndicatorContainer
        isActive={isActive}
        disabled={disabled}
        onClick={handleClick}
        as="button"
      >
        <S.Icon src={images[generateKey(step, !isActive)]} alt="" />
      </S.StepIndicatorContainer>
      {showDivisor && <S.StepDivisor disabled={isDisabled(step + 1, status)} />}
    </>
  );
};

const Stepper: React.RefForwardingComponent<
  { goToStep: Function },
  StepperProps
> = (
  {
    goToStep = () => {}, totalSteps = 1, status, currentStep, setStep,
  },
  ref,
) => {
  useEffect(() => {
    setStep(currentStep);
  }, [currentStep, setStep]);

  useImperativeHandle(ref, () => ({
    goToStep: (_step: number) => {
      goToStep(_step);
    },
  }));

  return (
    <S.Container>
      <Step
        action={goToStep}
        step={1}
        status={status}
        totalSteps={totalSteps}
        isActive={currentStep === 1}
      />
      <Step
        action={goToStep}
        step={2}
        status={status}
        totalSteps={totalSteps}
        isActive={currentStep === 2}
      />
      <Step
        action={goToStep}
        step={3}
        status={status}
        totalSteps={totalSteps}
        isActive={currentStep === 3}
      />
      <Step
        action={goToStep}
        step={4}
        status={status}
        totalSteps={totalSteps}
        isActive={currentStep === 4}
      />
    </S.Container>
  );
};

export default React.forwardRef(Stepper);
