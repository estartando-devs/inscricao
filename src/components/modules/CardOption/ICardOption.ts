export interface ICardOption {
  image: string;
  label?: string;
  value: string | boolean | number;
  selected?: string;
  setValue: (value: string | boolean | number) => void;
}
