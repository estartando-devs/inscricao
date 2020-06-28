import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import * as S from "./FormManagerStyled";
import Stepper from "./components/modules/Stepper/Stepper";
import PersonalData from "./components/features/PersonalData/PersonalData";
import IsStudent from "./components/features/IsStudent/IsStudent";

interface IFormValues {
  fullName: string;
  email: string;
  dateBirth: string;
  phone: string;
  zipcode: string;
  address: string;
  isStudent: boolean;
}

const initialValues: IFormValues = {
  fullName: "",
  email: "",
  dateBirth: "",
  phone: "",
  zipcode: "",
  address: "",
  isStudent: false,
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
  cep: Yup.string().min(10, "Cep inválido").max(10, "Cep inválido"),
  address: Yup.string().required("Endereço é obrigatório"),
  isStudent: Yup.string(),
});

const FormManager = () => {
  const status = [true, true, false, false];

  const onSubmit = (values: IFormValues) => {
    console.log(values);
  };

  return (
    <S.FormManagerContainer>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={PersonalDataSchema}
      >
        <S.StepWizardStyled nav={<Stepper status={status} />}>
          <PersonalData />
          <IsStudent />
          <div>form 3</div>
          <div>form 4</div>
        </S.StepWizardStyled>
      </Formik>
    </S.FormManagerContainer>
  );
};

export default FormManager;
