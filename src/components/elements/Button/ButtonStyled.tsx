import styled, { css } from "styled-components";
import { IButton } from "../../../models";

const SIZE = {
  small: css`
    width: 136px;
  `,
  medium: css`
    width: 200px;
  `,
  large: css`
    width: 70%;
  `,
  huge: css`
    width: 100%;
  `,
};

const VARIANT = {
  default: css`
    background-color: ${(props) => props.theme.palette.primary.main};
    border-color: ${(props) => props.theme.palette.primary.main};
    color: ${(props) => props.theme.palette.primary.contrastText};
  `,
  outlined: css`
    background-color: transparent;
    border-color: ${(props) => props.theme.palette.primary.main};
    color: ${(props) => props.theme.palette.primary.main};
  `,
};

const DISABLED = css`
  cursor: not-allowed;
  background-color: ${(props) => props.theme.palette.grey[500]};
  border-color: ${(props) => props.theme.palette.grey[500]};
  color: ${(props) => props.theme.palette.grey[400]};
`;

const ButtonContainer = styled.button<IButton>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: solid 2px;
  height: 40px;
  box-shadow: ${(props) => props.theme.shadows[0]};
  padding: ${(props) => props.theme.shape?.padding.small};
  border-radius: ${(props) => props.theme.shape?.borderRadius};
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
  ${(props) => props.variant && VARIANT[props.variant]};
  ${(props) => props.disabled && DISABLED};
  ${(props) => props.size && SIZE[props.size]}
`;

export { ButtonContainer };