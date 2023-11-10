import { createApi } from 'unsplash-js';
import { type Photos } from 'unsplash-js/dist/methods/search/types/response';
import { type Errors } from 'unsplash-js/dist/helpers/errors';

export type FormAction = (
  state: IState,
  formData?: FormData
) => Promise<IState>;

export type UnsplashApi = ReturnType<typeof createApi>;

export type SearchParams = Parameters<UnsplashApi['search']['getPhotos']>[0];

export type SearchInputs = Pick<
  SearchParams,
  'query' | 'page' | 'perPage' | 'orderBy' | 'color'
>;

export interface IState extends SearchInputs {
  pending: boolean;
  errors?: Errors;
  results: Photos['results'];
  total: Photos['total'];
  total_pages: Photos['total_pages'];
  submitted: boolean;
  success: boolean;
}
