import React from "react";
import { useFormikContext, useField } from "formik";

import { TextArea } from "../../../../../elements";
import * as S from "./SelectCourseStyled";

import { CardOption } from "../../../../../modules";
import { getImage } from "../../../../../../shared/img";

interface IProps {
  nextStep?: Function;
  previousStep?: Function;
}

const SelectCourse: React.FC<IProps> = ({
  nextStep = () => {},
  previousStep = () => {},
}) => {
  const { setFieldValue } = useFormikContext();

  const [, { value }] = useField("course");

  const handleIsCourse = (_course: any) => {
    setFieldValue("course", _course);
  };

  return (
    <S.SelectCourseWrapper>
      <S.PageHeader>Qual curso você quer fazer?</S.PageHeader>
      <S.Options>
        <CardOption
          image={getImage("cursoDesenvolvimento")}
          value="Desenvolvimento Web"
          setValue={handleIsCourse}
          label="Desenvolvimento Web"
          selected={value}
        />
        <CardOption
          image={getImage("cursoDesenvolvimento")}
          value="Desenvolvimento Backend"
          setValue={handleIsCourse}
          label="Desenvolvimento Backend"
          selected={value}
        />
        <CardOption
          image={getImage("cursoDesign")}
          value="Design UI/UX"
          setValue={handleIsCourse}
          label="Design UI/UX"
          selected={value}
        />
      </S.Options>

      <S.TestimonyWrapper>
        <S.TestimonyTitle>
          Você tem alguma experiência na área do curso escolhido? Conta pra
          gente!
        </S.TestimonyTitle>
        <S.TestimonyBox>
          <TextArea name="testimony" placeholder="Você pode escrever aqui." />
        </S.TestimonyBox>
        <S.GreenBalloon />
      </S.TestimonyWrapper>
    </S.SelectCourseWrapper>
  );
};

export default SelectCourse;
