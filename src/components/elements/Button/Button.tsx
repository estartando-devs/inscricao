import React from 'react';
import * as S from './ButtonStyled';
import ReactLoading from 'react-loading';

export interface IButton {
  /**
   *function to be performed at the click of button
   */
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
  /**
   * expected one of  'default' | 'outlined'
   */
  variant?: 'default' | 'outlined' ,
  /**
   * one of 'large' | 'medium' | 'small'
   */
  size?: 'large' | 'medium' | 'small' | 'huge',
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

const Button: React.FC<IButton> = ({
  onClick,
  variant = "default",
  size= "small",
  disabled,
  isLoading = false,
  children,
  ...rest
}) => {
return (
<S.ButtonContainer 
  onClick={onClick}
  variant={variant}
  size={size}
  disabled={disabled}
  isLoading={isLoading}
  {...rest}
>
  {
  isLoading ? 
    <ReactLoading
      type="spokes"
      height={'20px'}
      width={'20px'}
    /> :
    children
  }
</S.ButtonContainer>
);
};

export default Button;