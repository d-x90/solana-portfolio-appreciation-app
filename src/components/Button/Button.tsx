import { FC } from 'react';
import './Button.scss';

export interface ButtonProps {
  className?: string;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = (props) => {
  return (
    <button {...props} className={`button ${props.className}`}>
      {props.children}
    </button>
  );
};

export default Button;
