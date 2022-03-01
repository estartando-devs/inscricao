import React, { useState, useRef, useCallback } from "react";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";

import {
  sendSubscription, ISubscription, notifyDiscord, NotifyDiscordService,
} from "../../../services";
import { currentYear } from "../../../utils/currentYear";
import { useNotification } from "../../../contexts";
import {
  PersonalData, IsStudent, SelectCourse, AvailableTime,
} from "./components/features";
import { Stepper, StepperBottom } from "./components/modules";
import { initialValues, PersonalDataSchema } from "./helpers";
import * as S from "./FormManagerStyled";

const FormManager = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const StepperRef = useRef<{ goToStep: Function }>(null);
  const AvailableTimeRef = useRef<{ submitForm: Function }>(null);
  const status = [true, true, true, true];

  const mountDiscordConfig = useCallback((subscription: ISubscription): NotifyDiscordService => ({
    webhookId: process.env.REACT_APP_WEBHOOK_NOTIFICATION_ID as string,
    webhookToken: process.env.REACT_APP_WEBHOOK_NOTIFICATION_TOKEN as string,
    body: JSON.stringify({
      content: `Mais um inscrito no Estartando Devs ${currentYear} 🎉
                \n👨‍💻 Nome:  ${subscription.fullName}
                \n📍 Local:  ${subscription.city} , ${subscription.neighborhood}
                \n💻 Turma:  ${subscription.course}
               `,
    }),
  }), []);

  const goToStep = useCallback((_step: number) => StepperRef.current?.goToStep(_step), []);

  const { notify } = useNotification();

  const onSubmit = async (
    values: ISubscription,
  ) => {
    if (step !== 4) {
      goToStep(step + 1);
    }
    setLoading(true);
    try {
      await sendSubscription(values);
      await notifyDiscord(mountDiscordConfig(values));
      setLoading(false);
      history.push("/registration-end", "success");
    } catch ({ message }) {
      setLoading(false);
      notify(
        message as string || "Ocorreu um erro. Tente novamente mais tarde.",
        {
          type: "error",
        },
      );
    }
  };

  return (
    <S.FormManagerContainer>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={PersonalDataSchema}
      >
        <S.StepWizardStyled
          nav={<Stepper ref={StepperRef} setStep={setStep} status={status} />}
        >
          <PersonalData />
          <IsStudent />
          <SelectCourse />
          <AvailableTime ref={AvailableTimeRef} />
        </S.StepWizardStyled>
      </Formik>
      <StepperBottom
        isFirst={step === 1}
        handlePrev={() => goToStep(step - 1)}
        handleNext={() => goToStep(step + 1)}
        canSubmit={step === 4}
        onSubmit={AvailableTimeRef.current?.submitForm}
        isLoading={loading}
      />
    </S.FormManagerContainer>
  );
};

export default FormManager;
