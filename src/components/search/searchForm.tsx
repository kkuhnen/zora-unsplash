import {
  type ChangeEvent,
  type FC,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { type ColorId } from 'unsplash-js';
import {
  ChevronUpDownIcon,
  EyeDropperIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { useAppState } from '@/app/context';
import { SearchBox } from '@/components/form/searchBox';
import { SelectList } from '@/components/form/selectList';
import { ColorOptions, SortOptions } from '@/utils/parseFormData';
import styles from './search.module.css';

export const SearchForm: FC<{
  action?: () => void;
  children?: ReactNode;
}> = ({ action, children }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const queryRef = useRef<HTMLInputElement>(null);
  const state = useAppState();
  const [color, setColor] = useState(state.color);

  const submitFormIfSearchQuery = () => {
    if (queryRef.current?.value?.trim()) {
      formRef.current?.requestSubmit();
    }
  };

  const handleColorChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setColor(event?.target?.value as ColorId);
    submitFormIfSearchQuery();
  };

  useEffect(() => {
    document.body.classList.forEach((c) => {
      if (c.startsWith('colorized-')) {
        document.body.classList.remove(c);
      }
    });
    const newColor = color?.trim();
    if (newColor) {
      document.body.classList.add(`colorized-${newColor}`);
    }
  }, [color]);

  return (
    <form
      name="search"
      ref={formRef}
      action={action}
      className="flex-grow flex flex-col justify-start"
    >
      <div className={styles.controlsRow}>
        <SearchBox
          className={`${styles.controlsCol} flex-grow max-w-sm`}
          icon={(classes) => <MagnifyingGlassIcon className={classes} />}
          label="Search term"
          name="query"
          placeholder="e.g. dog, books"
          ref={queryRef}
        />
        <div className={styles.controlsBreak} />
        <SelectList
          className={styles.controlsCol}
          icon={(classes) => <EyeDropperIcon className={classes} />}
          label="Color"
          name="color"
          onChange={handleColorChange}
          values={[
            { label: 'any color', value: '' },
            ...Object.values(ColorOptions),
          ]}
        />
        <SelectList
          className={styles.controlsCol}
          icon={(classes) => <ChevronUpDownIcon className={classes} />}
          label="Sort by"
          name="orderBy"
          onChange={submitFormIfSearchQuery}
          values={Object.values(SortOptions)}
        />
      </div>
      {children}
    </form>
  );
};
