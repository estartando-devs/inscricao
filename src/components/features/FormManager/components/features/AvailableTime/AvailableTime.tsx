import React, { ChangeEvent, useEffect, useImperativeHandle } from "react";
import { useFormikContext, useField } from "formik";

import * as S from "./AvailableTimeStyled";

import { CardOption } from "../../../../../modules";
import { getImage } from "../../../../../../shared/img";
import { useNotification } from "../../../../../../contexts";
import { TERMS_OF_USE_URL } from "../../../../../../utils/constants/termsURL";

interface IProps {
  nextStep?: Function;
  previousStep?: Function;
  isLastStep: boolean;
}

const AvailableTime: React.RefForwardingComponent<
  { submitForm: Function },
  IProps
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
> = ({ previousStep = () => {}, isLastStep }, ref) => {
  const { setFieldValue, submitForm, isValid } = useFormikContext();
  const [, { value }] = useField("availableTime");
  const { notify } = useNotification();

  const handleIsStudentStatus = (_value: string | number | boolean) => {
    setFieldValue("availableTime", _value);
  };

  const handleTermsOfUse = (event: ChangeEvent<HTMLInputElement>) => {
    setFieldValue("acceptTerms", event.target.checked);
  };

  useImperativeHandle(ref, () => ({
    submitForm,
  }));

  useEffect(() => {
    if (isLastStep && !isValid) {
      notify(
        "Ei! Parece que esqueceu de preencher alguma coisa... Volte ao primeiro passo e confira se não falta nada.",
        {
          type: "error",
          duration: 5000,
        },
      );
    }
  }, [isValid, isLastStep, notify]);

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
      <S.TermsOfUse>
        <input
          type="checkbox"
          id="terms"
          onChange={handleTermsOfUse}
          value="1"
        />
        <label htmlFor="terms">
          {" "}
          Eu li e concordo com as
          {" "}
          <a href={TERMS_OF_USE_URL} target="_blank" rel="noopener noreferrer">
            Políticas de Privacidade.
          </a>
        </label>
      </S.TermsOfUse>
    </S.AvailableTimeWrapper>
  );
};

export default React.forwardRef(AvailableTime);
