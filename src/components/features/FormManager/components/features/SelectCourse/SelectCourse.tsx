import React, { useState } from "react";
import { useFormikContext } from "formik";

import { Button, TextArea } from "../../../../../elements";
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

  const [course, setCourse] = useState("");
  // const [testimony, setTestimony] = useState("");

  const handleIsCourse = (_course: any) => {
    setFieldValue("course", _course);
  };

  const handlePrev = () => {
    previousStep();
  };
  const handleNext = () => {
    nextStep();
    handleIsCourse(course);
  };
  return (
    <S.SelectCourseWrapper>
      <S.PageHeader>
        Qual curso você quer fazer?
      </S.PageHeader>
      <S.Options>
        <CardOption
          image={getImage("cursoDesenvolvimento")}
          value="Desenvolvimento Web"
          setValue={() => setCourse("Desenvolvimento Web")}
          label="Desenvolvimento Web"
          selected={course}
        />
        <CardOption
          image={getImage("cursoDesign")}
          value="Design UI/UX"
          setValue={() => setCourse("Design UI/UX")}
          label="Design UI/UX"
          selected={course}
        />
      </S.Options>

      <S.TestimonyWrapper>
        <S.TestimonyTitle>
          Você tem alguma experiência na área do curso escolhido? Conta pra gente!
        </S.TestimonyTitle>
        <S.TestimonyBox>
          <TextArea
            name="testimony"
            placeholder="Você pode escrever aqui"
          />
        </S.TestimonyBox>
      </S.TestimonyWrapper>

      <S.ButtonsContainer>
        <Button onClick={handlePrev} variant="outlined">Voltar</Button>
        <Button onClick={handleNext}>Avançar</Button>
      </S.ButtonsContainer>
    </S.SelectCourseWrapper>
  );
};

export default SelectCourse;
