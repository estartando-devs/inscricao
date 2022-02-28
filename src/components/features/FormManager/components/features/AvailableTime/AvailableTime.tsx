import React, { useImperativeHandle } from "react";
import { useFormikContext, useField } from "formik";

import * as S from "./AvailableTimeStyled";

import { CardOption } from "../../../../../modules";
import { getImage } from "../../../../../../shared/img";

interface IProps {
  nextStep?: Function;
  previousStep?: Function;
}

const AvailableTime: React.RefForwardingComponent<
  { submitForm: Function },
  IProps
> = ({ previousStep = () => {} }, ref) => {
  const { setFieldValue, submitForm, isValid } = useFormikContext();
  const [, { value }] = useField("availableTime");

  const handleIsStudentStatus = (_value: string | number | boolean) => {
    setFieldValue("availableTime", _value);
  };

  useImperativeHandle(ref, () => ({
    submitForm,
  }));

  return (
    <S.AvailableTimeWrapper>
      {isValid ? (
        <>
          <S.PageHeader>
            Para terminar, uma informação importante: as aulas serão às terças e
            quintas, de 19h30 às 21h30. Você tem disponibilidade nesses dias e
            horário?
          </S.PageHeader>
          <S.Options>
            <CardOption
              image={getImage("finalSim")}
              value
              setValue={handleIsStudentStatus}
              selected={value}
            />
            <CardOption
              image={getImage("finalNao")}
              value={false}
              setValue={handleIsStudentStatus}
              selected={value}
            />
          </S.Options>
        </>
      ) : (
        <S.CardError>
          <S.CardErrorMessage>
            Ei! Parece que esqueceu de preencher alguma coisa... Volte ao
            primeiro passo e confira se nao falta nada.
          </S.CardErrorMessage>
        </S.CardError>
      )}
    </S.AvailableTimeWrapper>
  );
};

export default React.forwardRef(AvailableTime);
