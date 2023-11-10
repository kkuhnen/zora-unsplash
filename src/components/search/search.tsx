'use client';

import { type FC, type MouseEvent, useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { AppStateProvider } from '@/app/context';
import { Results } from '@/components/results/results';
import { Status } from '@/components/results/status';
import { SortOptions, parseFormData } from '@/utils/parseFormData';
import type { FormAction, SearchInputs, IState } from '@/types';
import { Pagination } from './pagination';
import styles from './search.module.css';
import { SearchForm } from './searchForm';

export const Search: FC<{ action: FormAction; initialState: IState }> = ({
  action,
  initialState,
}) => {
  const lastQuery = useRef<Omit<SearchInputs, 'page' | 'perPage'>>({
    query: initialState.query,
    color: initialState.color,
    orderBy: initialState.orderBy,
  });

  const handleFormSubmit = async (state: IState, formData?: FormData) => {
    const searchParams = formData ? parseFormData(formData) : undefined;
    const isSearchParamsChanged =
      searchParams?.query !== state?.query ||
      searchParams?.color !== state?.color ||
      searchParams?.orderBy !== state?.orderBy;
    if (isSearchParamsChanged) {
      lastQuery.current = {
        query: searchParams?.query ?? '',
        color: searchParams?.color,
        orderBy: searchParams?.orderBy ?? SortOptions.relevant,
      };
      formData?.set('page', '1');
    }
    return await action(state, formData);
  };

  const [state, formAction] = useFormState<IState>(
    handleFormSubmit,
    initialState
  );
  const [page, setPage] = useState(state.page ?? 1);

  const handlePageNext = (event: MouseEvent<HTMLButtonElement>) => {
    if (page === state.total_pages) {
      event.preventDefault();
      return;
    }
    setPage(page + 1);
  };

  const handlePagePrevious = (event: MouseEvent<HTMLButtonElement>) => {
    if (page === 1) {
      event.preventDefault();
      return;
    }
    setPage(page - 1);
  };

  useEffect(() => {
    if (state.page) {
      setPage(state.page);
    }
  }, [state.page, setPage]);

  return (
    <AppStateProvider value={state}>
      <SearchForm action={formAction}>
        <input type="hidden" name="page" value={page} />
        <Status />
        {!!state.results.length && (
          <Pagination
            page={page}
            total={state.total_pages}
            onPagePrevious={handlePagePrevious}
            onPageNext={handlePageNext}
            className={styles.paginationTop}
          />
        )}
        <Results />
        {!!state.results.length && (
          <Pagination
            page={page}
            total={state.total_pages}
            onPagePrevious={handlePagePrevious}
            onPageNext={handlePageNext}
            className={styles.paginationBottom}
          />
        )}
      </SearchForm>
    </AppStateProvider>
  );
};
