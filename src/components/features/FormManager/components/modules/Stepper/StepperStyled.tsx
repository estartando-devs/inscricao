import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const StepIndicatorContainer = styled.div<{
  disabled?: boolean;
  isActive?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 24px 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8),
    -1px -1px 3px rgba(123, 122, 122, 0.3);
  background-color: #fff;
  background-color: ${(props) => props.theme.palette.primary.main};
  ${(props) =>
    !props.isActive &&
    css`
      background-color: ${props.theme.palette.background.default};
    `};
`;

export const StepDivisor = styled.div<{ disabled?: boolean }>`
  width: 32px;
  height: 2px;
  /* background-color: ${(props) => props.theme.palette.primary.main}; */
  /* box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8),
    -1px -1px 3px rgba(123, 122, 122, 0.3); */

  ${(props) =>
    // props.disabled &&
    css`
      box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3),
        -1px -1px 3px rgba(123, 122, 122, 0.2);
      background-color: ${props.theme.palette.background.default};
    `};
`;

export const Icon = styled.img<{ src: any }>``;
