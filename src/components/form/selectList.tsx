import type { FC, ChangeEventHandler } from 'react';
import type { IFormItemProps } from './types';
import { FormItem } from './formItem';
import styles from './form.module.css';

export const SelectList: FC<
  IFormItemProps & {
    name: string;
    onChange: ChangeEventHandler<HTMLSelectElement>;
    values: Array<string | { label?: string; value: string }>;
  }
> = ({ className, icon, label, name, onChange, values }) => (
  <FormItem className={className} icon={icon} label={label}>
    {(id) => (
      <>
        <select
          id={id}
          name={name}
          onChange={onChange}
          className={`pr-7 ${!!icon ? styles.withPrefixIcon : ''}`}
        >
          {values.map((option) => {
            const value = typeof option === 'string' ? option : option.value;
            const label = typeof option === 'string' ? undefined : option.label;
            return (
              <option key={value} value={value}>
                {label ?? value.replaceAll('_', ' ')}
              </option>
            );
          })}
        </select>
        <span className={`${styles.suffixIcon} h-5`} aria-hidden="true">
          <span className={styles.caret} />
        </span>
      </>
    )}
  </FormItem>
);
