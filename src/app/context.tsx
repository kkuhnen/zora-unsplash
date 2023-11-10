import { createContext, useContext, type ReactNode } from 'react';
import { initialState } from '@/app/state';
import type { IState } from '@/types';

const AppStateContext = createContext<IState>(initialState);

export const AppStateProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: IState;
}) => (
  <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
);

export const useAppState = () => useContext(AppStateContext);
