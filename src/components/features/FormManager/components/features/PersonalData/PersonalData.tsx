import React from "react";
import { useFormikContext } from "formik";

import { Button, Input } from "../../../../../elements";
import * as S from "./PersonalDataStyled";
import { typeMask } from "../../../../../../utils/masks";
import { getAddressByCep } from "../../../../../../services/helper.service";

interface IProps {
  nextStep?: Function;
}

const PersonalData: React.FC<IProps> = ({ nextStep = () => {} }) => {
  const { setFieldValue } = useFormikContext();
  const handleNext = () => {
    nextStep();
  };

  const changeCep = async (value: string) => {
    const rawValue = value.replace(/[-.]/g, "");
    if (rawValue.length === 8) {
      const data = await getAddressByCep(rawValue);
      setFieldValue("address", data.logradouro);
      setFieldValue("neighborhood", data.bairro);
      setFieldValue("city", data.localidade);
    }
  };

  return (
    <S.PersonalDataWrapper>
      <Input label="Seu nome completo" name="fullName" />
      <Input label="Seu email" name="email" />
      <Input
        label="Quando você nasceu"
        name="dateBirth"
        width="70%"
        mask={typeMask.date}
      />
      <Input
        label="Seu telefone"
        name="phone"
        width="70%"
        mask={typeMask.phone}
      />
      <Input
        label="Seu cep (é opcional)"
        name="zipcode"
        width="90%"
        mask={typeMask.cep}
        onChange={changeCep}
      />
      <Input label="Seu endereço" name="address" />
      <Input label="Seu número" name="number" width="70%" />
      <Input label="Seu bairro" name="neighborhood" />
      <Input label="Sua cidade" name="city" />
      <S.ButtonsContainer>
        <Button onClick={handleNext}>Continuar</Button>
      </S.ButtonsContainer>
    </S.PersonalDataWrapper>
  );
};

export default PersonalData;
