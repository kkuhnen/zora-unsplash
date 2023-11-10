'use client';

import type { FC, MouseEvent, MouseEventHandler, ReactNode } from 'react';
import { useFormStatus } from 'react-dom';

export const Button: FC<{
  ariaLabel?: string;
  className?: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit';
}> = ({ ariaLabel, children, className, onClick, type = 'submit' }) => {
  const { pending } = useFormStatus();
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (pending) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };
  return (
    <button
      className={className}
      type={type}
      aria-disabled={pending}
      onClick={handleClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};
