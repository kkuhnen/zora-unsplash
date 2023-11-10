import { searchPhotos } from '@/app/actions';
import { initialState } from '@/app/state';
import { Search } from '@/components/search/search';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.pageContent}>
        <Search action={searchPhotos} initialState={initialState} />
      </div>
    </main>
  );
}
