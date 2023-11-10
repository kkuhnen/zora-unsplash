import { forwardRef } from 'react';
import type { IFormItemProps } from './types';
import { FormItem } from './formItem';
import { Button } from './button';
import styles from './form.module.css';

type Props = IFormItemProps & { name: string; placeholder?: string };

export const SearchBox = forwardRef<HTMLInputElement, Props>(function SearchBox(
  { className, icon, label, name, placeholder },
  ref
) {
  return (
    <FormItem className={className} icon={icon} label={label}>
      {(id) => (
        <span className="flex items-center">
          <input
            ref={ref}
            autoComplete="off"
            className={`${
              !!icon ? styles.withPrefixIcon : ''
            } flex-grow rounded-r-none`}
            id={id}
            name={name}
            placeholder={placeholder}
            required
            type="text"
          />
          <Button className={`${styles.cta} rounded-l-none`}>Search</Button>
        </span>
      )}
    </FormItem>
  );
});
