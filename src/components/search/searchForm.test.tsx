/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { SearchForm } from './searchForm';
import { initialState } from '@/app/state';
import { setup } from '@/utils/jest';

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormState: jest.fn(() => [initialState, 'action']),
  useFormStatus: jest.fn(() => ({ pending: false })),
}));

const setupForm = async (options?: Parameters<typeof setup>[1]) =>
  await setup(<SearchForm />, options);

describe('Search form', () => {
  it('shows inputs with default values', () => {
    render(<SearchForm />);
    expect(screen.getByLabelText(/search term/i)).toHaveValue('');
    expect(screen.getByLabelText(/color/i)).toHaveValue('');
    expect(screen.getByLabelText(/sort by/i)).toHaveValue('relevant');
  });

  it('can change color', async () => {
    const newValue = 'red';
    const { colorInput } = await setupForm({ inputs: { color: newValue } });
    expect(colorInput).toHaveValue(newValue);
  });

  it('changing color changes theme color', async () => {
    const newValue = 'red';
    await setupForm({ inputs: { color: newValue } });
    expect(document.body.classList).toContain(`colorized-${newValue}`);
  });

  it('changing color auto-submits form', async () => {
    const handleOnSubmitMock = jest.fn((e) => e.preventDefault());
    const { user, colorInput } = await setupForm({
      inputs: { query: 'dog' },
      mockFormAction: handleOnSubmitMock,
    });
    await user.selectOptions(colorInput, 'red');
    expect(handleOnSubmitMock).toHaveBeenCalled();
  });

  it('can change sort', async () => {
    const newValue = 'latest';
    const { sortInput } = await setupForm({ inputs: { orderBy: newValue } });
    expect(sortInput).toHaveValue(newValue);
  });

  it('changing sort auto-submits form', async () => {
    const handleOnSubmitMock = jest.fn((e) => e.preventDefault());
    const { user, sortInput } = await setupForm({
      inputs: { query: 'dog' },
      mockFormAction: handleOnSubmitMock,
    });
    await user.selectOptions(sortInput, 'latest');
    expect(handleOnSubmitMock).toHaveBeenCalled();
  });

  it('changing select does not submit form if search query is empty', async () => {
    const handleOnSubmitMock = jest.fn((e) => e.preventDefault());
    const { user } = await setupForm({ mockFormAction: handleOnSubmitMock });
    await user.selectOptions(screen.getByLabelText(/color/i), 'red');
    expect(handleOnSubmitMock).not.toHaveBeenCalled();
  });
});
