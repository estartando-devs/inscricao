import React from "react";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

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
import { useHistory } from "react-router-dom";

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
  availableTime: Yup.boolean().required("availableTime"),
  testimony: Yup.string(),
});

const FormManager = () => {
  const status = [true, true, true, true];
  const history = useHistory();

  const onSubmit = async (
    values: ISubscription,
    { setSubmitting }: FormikHelpers<ISubscription>
  ) => {
    try {
      // await sendSubscription(values);
      console.log("SUbmit");
      history.push("/registration-end", "success");
      setSubmitting(false);
    } catch (error) {
      alert("Ops, tivemos um problema.");
      console.log(error);
    }
    setSubmitting(false);
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
          <SelectCourse />
          <AvailableTime />
        </S.StepWizardStyled>
      </Formik>
    </S.FormManagerContainer>
  );
};

export default FormManager;
