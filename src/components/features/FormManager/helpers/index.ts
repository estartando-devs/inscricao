import * as Yup from "yup";
import { ISubscription } from "../../../../services/student.service";

export const initialValues: ISubscription = {
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
  acceptTerms: false,
  monthlyHouseholdIncome: "",
};

export const PersonalDataSchema = Yup.object().shape({
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
  acceptTerms: Yup.boolean(),
  monthlyHouseholdIncome: Yup.string().required("Renda familiar é obrigatório"),
});
