import { type FC } from 'react';
import { useFormStatus } from 'react-dom';
import { useAppState } from '@/app/context';

export const Status: FC = () => {
  const { pending } = useFormStatus();
  const { success, errors } = useAppState();
  return (
    <p aria-live="polite" className="sr-only" role="status">
      {pending
        ? 'loading'
        : success
        ? 'success'
        : errors?.map((error) => error + `\n`)}
    </p>
  );
};
