import { IState } from '@/types';

export const initialState: IState = {
  // inputs
  query: '',
  page: 1,
  orderBy: 'relevant',
  color: undefined,
  // results
  pending: false,
  errors: undefined,
  results: [],
  submitted: false,
  success: false,
  total: 0,
  total_pages: 0,
};
