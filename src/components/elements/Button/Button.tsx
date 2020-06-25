import React from 'react';
import * as S from './ButtonStyled'

interface IButton {
  /**
   *function to be performed at the click of button
   */
  onClick: Function,
  /**
   * expected one of  'default' | 'outlined'
   * @default 'default'
   */
  variant?: 'default' | 'outlined',
  /**
   * one of 'large' | 'medium' | 'small'
   */
  size?: 'large' | 'medium' | 'small',
  /**
   * bollean 
   */
  disabled?: boolean,
  /**
   * boolean
   */
  isLoading?: boolean,
  /**
   * React element
   */
  children: React.ReactNode
}

const Button = ({
  onClick,
  variant,
  size,
  disabled,
  isLoading,
  children,
  ...rest
}: IButton) => {
return (
<S.ButtonContainer>
  {children}
</S.ButtonContainer>
);
};

export default Button;