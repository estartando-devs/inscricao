import styled from "styled-components";
import StepWizard from "react-step-wizard";

export const FormManagerContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  max-width: 380px;
`;

export const StepWizardStyled = styled(StepWizard)`
  width: 100%;
  height: auto;
  overflow: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
