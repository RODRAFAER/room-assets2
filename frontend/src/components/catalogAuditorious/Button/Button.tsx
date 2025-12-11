
import clsx from 'clsx';
import b from "./Button.module.css";
import { type ComponentPropsWithoutRef } from "react";



type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md" | "lg";

type NativeButtonProps = ComponentPropsWithoutRef<"button">;

interface ButtonProps extends NativeButtonProps {
   variant?: ButtonVariant;
   size?: ButtonSize;
   // className, disabled и children уже есть в NativeButtonProps, дублировать не обязательно
}


// interface ButtonProps {
//   children: ReactNode;
//   variant?: ButtonVariant;
//   size?: ButtonSize;
//   disabled?: boolean;
//   className?: string;
//   onClick?: () => void; // при желании можно сузить до React.MouseEventHandler<HTMLButtonElement>
// }

export function Button({
  children,
  variant = "primary",  // дефолтный вариант
  size = "md",          // дефолтный размер
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type} 
      {...rest} 
      className={clsx(  // Объединяем набор из нескольких стилей для кнопки
        b.button,
        b[variant],  // s.primary или s.secondary
        b[size],     // s.sm, s.md или s.lg
        rest.disabled && b.disabled,
        rest.className    // внешний пользовательские классы, которые могут быть переданы с компонентом
      )}
    >
      {children}
    </button>
  );
}