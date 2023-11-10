import type { FC, MouseEventHandler } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { Button } from '@/components/form/button';
import styles from './search.module.css';

export const Pagination: FC<{
  className?: string;
  page: number;
  total: number;
  onPageNext: MouseEventHandler<HTMLButtonElement>;
  onPagePrevious: MouseEventHandler<HTMLButtonElement>;
}> = ({ className, page, total, onPageNext, onPagePrevious }) => (
  <div className={`${styles.pagination} ${className ?? ''}`}>
    <p className="text-sm">{`Viewing page ${page} of ${total}`}</p>
    <div className={styles.paginationControls}>
      <Button
        onClick={onPagePrevious}
        ariaLabel="Previous page"
        className={`${styles.paginationControl} pr-1`}
      >
        <ChevronLeftIcon className="h-5" />
        Previous
      </Button>
      <div className={styles.separator} />
      <Button
        onClick={onPageNext}
        ariaLabel="Next page"
        className={`${styles.paginationControl} pl-1`}
      >
        Next
        <ChevronRightIcon className="h-5" />
      </Button>
    </div>
  </div>
);
