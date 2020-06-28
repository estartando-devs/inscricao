import React, { useRef, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import * as S from "./FormManagerStyled";
import Stepper from "./components/modules/Stepper/Stepper";
// import { Button } from "../../elements/Button";
import PersonalData from "./components/features/PersonalData/PersonalData";

interface IFormValues {
  fullName: string;
  email: string;
  dateBirth: string;
  phone: string;
  zipcode: string;
  address: string;
  number: string;
  city: string;
  neighborhood: string;
}

const initialValues: IFormValues = {
  fullName: "",
  email: "",
  dateBirth: "",
  phone: "",
  zipcode: "",
  address: "",
  number: "",
  city: "",
  neighborhood: "",
};

const PersonalDataSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(4, "Nome muito curto")
    .required("Nome é obrigatório"),
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  dateBirth: Yup.string().required("Data de nascimento é obrigatório"),
  phone: Yup.string()
    .min(13, "Telefone inválido")
    .max(14, "Telefone inválido")
    .required("Telefone é obrigatório"),
  cep: Yup.string().min(10, "Cep inválido").max(10, "Cep inválido"),
  number: Yup.string(),
  address: Yup.string().required("Endereço é obrigatório"),
  neighborhood: Yup.string().required("Bairro é obrigatória"),
  city: Yup.string().required("Cidade é obrigatória"),
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
          <div>form 2</div>
          <div>form 3</div>
          <div>form 4</div>
        </S.StepWizardStyled>
      </Formik>
    </S.FormManagerContainer>
  );
};

export default FormManager;
