import { type FC, useState, memo } from 'react';
import Image from 'next/image';
import { Blurhash } from 'react-blurhash';
import type { IState } from '@/types';
import { CameraIcon, HeartIcon } from '@heroicons/react/24/solid';
import styles from './results.module.css';

const ResultItem: FC<{ result: IState['results'][0] }> = ({ result }) => {
  const width = 400;
  const height = Math.round(result.height * (400 / result.width));
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <a
      href={result.links.html}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.resultLink}
    >
      <div className={styles.result}>
        {!!result.blur_hash && (
          <div className={styles.blurhash}>
            <Blurhash
              hash={result.blur_hash}
              width={width}
              height={height}
              resolutionX={32}
              resolutionY={32}
              punch={1}
            />
          </div>
        )}
        <Image
          src={result.urls.small}
          alt={result.alt_description ?? ''}
          width={width}
          height={height}
          className={`${styles.image} ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
        />
        <span className="sr-only">Photo by {result.user.name} on Unsplash</span>
        <div className={styles.info} aria-hidden="true">
          <span className={styles.infoCol}>
            <CameraIcon className="h-4" /> {result.user.name}
          </span>
          <span className={styles.infoCol}>
            <HeartIcon className="h-4" /> {result.likes}
          </span>
        </div>
      </div>
    </a>
  );
};

export const ResultItemMemoized = memo(
  ResultItem,
  (prevProps, nextProps) =>
    prevProps.result.id === nextProps.result.id &&
    prevProps.result.updated_at === nextProps.result.updated_at
);
