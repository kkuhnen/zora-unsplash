'use server';

import { createApi } from 'unsplash-js';
import { parseFormData } from '@/utils/parseFormData';
import { IState } from '@/types';
import { initialState } from './state';

const isErrorInterface = (e: any): e is Error => {
  return !!e?.message;
};

const api = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY ?? '',
});

export const searchPhotos = async (state: IState, formData?: FormData) => {
  if (!formData?.get('query')?.toString()) {
    return state;
  }

  const searchParams = parseFormData(formData);

  try {
    const apiData = await api.search.getPhotos(searchParams);
    const { errors, response, type } = apiData;
    const newState: IState = {
      ...searchParams,
      pending: false,
      errors,
      results: response?.results ?? initialState.results,
      submitted: true,
      success: type === 'success',
      total: response?.total ?? initialState.total,
      total_pages: response?.total_pages ?? initialState.total_pages,
    };
    return newState;
  } catch (e) {
    const newState: IState = {
      ...searchParams,
      pending: false,
      errors: isErrorInterface(e)
        ? [e.message]
        : [typeof e === 'string' ? e : 'Unknown error'],
      results: initialState.results,
      submitted: true,
      success: false,
      total: initialState.total,
      total_pages: initialState.total_pages,
    };
    return newState;
  }
};
