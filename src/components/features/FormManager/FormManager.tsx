import React, { useState, useRef } from "react";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

import * as S from "./FormManagerStyled";
import Stepper from "./components/modules/Stepper/Stepper";
import PersonalData from "./components/features/PersonalData/PersonalData";
import IsStudent from "./components/features/IsStudent/IsStudent";
import SelectCourse from "./components/features/SelectCourse/SelectCourse";
import AvailableTime from "./components/features/AvailableTime/AvailableTime";
import {
  sendSubscription,
  ISubscription,
} from "../../../services/student.service";
import StepperBottom from "./components/modules/StepperBottom/StepperBottom";

const initialValues: ISubscription = {
  fullName: "",
  email: "",
  dateBirth: "",
  phone: "",
  zipcode: "",
  address: "",
  number: "",
  city: "",
  neighborhood: "",
  course: "",
  isStudent: undefined,
  availableTime: undefined,
  testimony: "",
};

const PersonalDataSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(4, "Nome muito curto")
    .required("Nome é obrigatório"),
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  dateBirth: Yup.string().required("Data de nascimento é obrigatório"),
  phone: Yup.string()
    .min(13, "Telefone inválido")
    .max(15, "Telefone inválido")
    .required("Telefone é obrigatório"),
  zipcode: Yup.string().min(10, "Cep inválido").max(10, "Cep inválido"),
  number: Yup.string(),
  address: Yup.string().required("Endereço é obrigatório"),
  neighborhood: Yup.string().required("Bairro é obrigatória"),
  city: Yup.string().required("Cidade é obrigatória"),
  isStudent: Yup.boolean().required("isStudent"),
  course: Yup.string().required("course"),
  availableTime: Yup.boolean(),
  testimony: Yup.string(),
});

const FormManager = () => {
  const status = [true, true, true, true];
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const StepperRef = useRef<{ goToStep: Function }>(null);
  const AvailableTimeRef = useRef<{ submitForm: Function }>(null);

  const onSubmit = async (
    values: ISubscription,
    { setSubmitting }: FormikHelpers<ISubscription>
  ) => {
    console.log("VALUES :: ", values);
    if (step !== 4) {
      goToStep(step + 1);
    }
    setLoading(true);
    try {
      await sendSubscription(values);
      setLoading(false);
      history.push("/registration-end", "success");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const goToStep = (_step: number) => {
    StepperRef.current?.goToStep(_step);
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
