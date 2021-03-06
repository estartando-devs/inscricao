export interface IButton {
  /**
   *function to be performed at the click of button
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * expected one of  'default' | 'outlined'
   */
  variant?: "default" | "outlined";
  /**
   * one of 'large' | 'medium' | 'small'
   */
  size?: "large" | "medium" | "small" | "huge";
  /**
   * bollean
   */
  disabled?: boolean;
  /**
   * boolean
   */
  isLoading?: boolean;
  /**
   * one of "button" | "submit" | "reset" | undefined
   */
  type?: "button" | "submit" | "reset" | undefined;
  /**
   * React element
   */
  children: React.ReactNode;
}
