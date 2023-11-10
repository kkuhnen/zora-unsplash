import { type FC, type ReactNode, useId } from 'react';
import type { IFormItemProps } from './types';
import styles from './form.module.css';

export const FormItem: FC<
  IFormItemProps & {
    children: (id: string) => ReactNode;
  }
> = ({ children, className, icon, label }) => {
  const id = useId();
  return (
    <div className={className}>
      {!icon && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <span className="relative inline-block w-full">
        {!!icon && (
          <label htmlFor={id} className={styles.prefixIcon}>
            <span className="sr-only">{label}</span>
            {icon?.('h-5')}
          </label>
        )}
        {children(id)}
      </span>
    </div>
  );
};
