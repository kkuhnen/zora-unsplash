import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import type { IState } from '@/types';

export const setup = async (
  jsx: JSX.Element,
  options?: {
    inputs?: Partial<Pick<IState, 'query' | 'color' | 'orderBy'>>;
    mockFormAction?: jest.Mock;
  }
) => {
  const { inputs, mockFormAction } = options ?? {};
  const user = userEvent.setup();
  render(jsx);

  const searchInput = screen.getByLabelText(/search term/i);
  const colorInput = screen.getByLabelText(/color/i);
  const sortInput = screen.getByLabelText(/sort by/i);

  if (mockFormAction) {
    screen.getByRole('form').addEventListener('submit', mockFormAction);
  }

  if (inputs?.query) {
    await user.type(searchInput, inputs.query);
  }

  if (inputs?.color) {
    await user.selectOptions(colorInput, inputs.color);
  }

  if (inputs?.orderBy) {
    await user.selectOptions(sortInput, inputs.orderBy);
  }

  return { user, searchInput, colorInput, sortInput };
};
