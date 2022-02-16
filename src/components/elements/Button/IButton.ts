import { ButtonHTMLAttributes } from "react";

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * expected one of  'default' | 'outlined'
   */
  variant?: "default" | "outlined";
  /**
   * one of 'large' | 'medium' | 'small'
   */
  size?: "large" | "medium" | "small" | "huge";
  /**
   * boolean
   */
  isLoading?: boolean;
  /**
   * one of "button" | "submit" | "reset" | undefined
   */
  type?: "button" | "submit" | "reset" | undefined;
}
