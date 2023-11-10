import type { ColorId, SearchOrderBy } from 'unsplash-js';
import { type SearchInputs } from '@/types';

export const SortOptions: Record<SearchOrderBy, SearchOrderBy> = {
  relevant: 'relevant',
  latest: 'latest',
  editorial: 'editorial',
};

export const ColorOptions: Record<ColorId, ColorId> = {
  black: 'black',
  white: 'white',
  black_and_white: 'black_and_white',
  blue: 'blue',
  green: 'green',
  magenta: 'magenta',
  orange: 'orange',
  purple: 'purple',
  red: 'red',
  teal: 'teal',
  yellow: 'yellow',
};

export const parseColor = (color: string) =>
  ColorOptions[color as ColorId] ?? undefined;

export const parseOrder = (orderBy: string) =>
  SortOptions[orderBy as SearchOrderBy] ?? SortOptions.relevant;

export const parseFormData = (formData: FormData): SearchInputs => ({
  query: formData?.get('query')?.toString() ?? '',
  page: parseInt(formData?.get('page')?.toString() ?? '1'),
  perPage: 20,
  orderBy: parseOrder(formData?.get('orderBy')?.toString() ?? ''),
  color: parseColor(formData?.get('color')?.toString() ?? ''),
});
