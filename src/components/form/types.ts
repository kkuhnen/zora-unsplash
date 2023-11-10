import { ReactNode } from 'react';

export interface IFormItemProps {
  className?: string;
  icon?: (classes: string) => ReactNode;
  label: string;
}
