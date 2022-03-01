import React, { useEffect, useImperativeHandle } from "react";
import { useFormikContext, useField } from "formik";

import * as S from "./AvailableTimeStyled";

import { CardOption } from "../../../../../modules";
import { getImage } from "../../../../../../shared/img";
import { useNotification } from "../../../../../../contexts";

interface IProps {
  nextStep?: Function;
  previousStep?: Function;
}

const AvailableTime: React.RefForwardingComponent<
  { submitForm: Function },
  IProps
// eslint-disable-next-line @typescript-eslint/no-unused-vars
> = ({ previousStep = () => {} }, ref) => {
  const { setFieldValue, submitForm, isValid } = useFormikContext();
  const [, { value }] = useField("availableTime");
  const { notify } = useNotification();

  const handleIsStudentStatus = (_value: string | number | boolean) => {
    setFieldValue("availableTime", _value);
  };

  useImperativeHandle(ref, () => ({
    submitForm,
  }));

  useEffect(() => {
    if (!isValid) {
      notify(
        "Ei! Parece que esqueceu de preencher alguma coisa... Volte ao primeiro passo e confira se não falta nada.",
        {
          type: "error",
          duration: 5000,
        },
      );
    }
  }, [isValid, notify]);

  return (
    <S.AvailableTimeWrapper>
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
    </S.AvailableTimeWrapper>
  );
};

export default React.forwardRef(AvailableTime);
