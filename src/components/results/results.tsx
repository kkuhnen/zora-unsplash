import { type FC, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { useAppState } from '@/app/context';
import { ResultItemMemoized } from './resultItem';
import styles from './results.module.css';

export const Results: FC = () => {
  const { pending } = useFormStatus();
  const { submitted, errors, results } = useAppState();
  const elem = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const elemTop = elem.current?.getBoundingClientRect().top ?? 0;
    if (window.scrollY > elemTop) {
      window.scrollTo({
        top: elemTop,
        behavior: 'smooth',
      });
    }
  }, [results]);

  if (pending && !results.length) {
    return (
      <div ref={elem} className={`${styles.placeholderText} ${styles.empty}`}>
        <p className="mx-auto">Loading...</p>
      </div>
    );
  }

  if (errors?.length) {
    return (
      <div ref={elem} className={`${styles.placeholderText} ${styles.empty}`}>
        {errors.length === 1 && <p className="mx-auto">Error: {errors[0]}</p>}
        {errors.length > 1 && (
          <>
            <p>Errors:</p>
            <ul>
              {errors.map((error) => (
                <li key={error} className="mx-auto">
                  {error}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    );
  }

  if (results.length === 0) {
    if (!submitted) {
      return (
        <div ref={elem} className={`${styles.placeholderText} max-w-[35rem]`}>
          <p>
            Enter keywords in the search box above to find the perfect image.
            Your search results will be displayed here.
          </p>
          <p>
            Whether you&apos;re looking for stunning landscapes, vibrant
            abstracts, or candid moments, a world of images is just a search
            away.
          </p>
          <p>Go ahead, give it a try!</p>
        </div>
      );
    }
    return (
      <div ref={elem} className={`${styles.placeholderText} ${styles.empty}`}>
        <p className="mx-auto">No results found</p>
      </div>
    );
  }

  return (
    <div
      ref={elem}
      className={`${styles.results} ${pending ? styles.resultsPending : ''}`}
      data-testid="search-results"
    >
      {results.map((result) => (
        <ResultItemMemoized key={result.id} result={result} />
      ))}
    </div>
  );
};
