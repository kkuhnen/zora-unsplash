/**
 * @jest-environment jsdom
 */
import reactdom from 'react-dom';
import { within } from '@testing-library/dom';
import { screen } from '@testing-library/react';
import { Search } from './search';
import { initialState } from '@/app/state';
import { results } from '@/fixtures/results';
import { setup } from '@/utils/jest';
import { IState, FormAction } from '@/types';

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormState: null,
  useFormStatus: null,
}));

const serverAction = async (state: IState, formData?: FormData) => state;

const setupSearch = async (
  options: Parameters<typeof setup>[1] & {
    initialState: IState;
    action: FormAction;
  }
) =>
  await setup(
    <Search initialState={options.initialState} action={options.action} />,
    options
  );

describe('Search initial state', () => {
  it('should display initial state help text', async () => {
    // @ts-expect-error
    reactdom.useFormState = jest.fn(() => [initialState, 'action']);
    // @ts-expect-error
    reactdom.useFormStatus = jest.fn(() => ({ pending: false }));
    await setupSearch({ initialState, action: serverAction });
    expect(
      screen.getByText(
        `Enter keywords in the search box above to find the perfect image. Your search results will be displayed here.`
      )
    ).toBeInTheDocument();
  });
});

describe('Search loading state', () => {
  it('should display loading text & provide screen reader status text on first submit', async () => {
    // @ts-expect-error
    reactdom.useFormState = jest.fn(() => [initialState, 'action']);
    // @ts-expect-error
    reactdom.useFormStatus = jest.fn(() => ({ pending: true }));
    await setupSearch({ initialState, action: serverAction });
    expect(screen.getByText(`Loading...`)).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('loading');
  });

  it('should provide loading status text for screen readers on all submissions', async () => {
    // @ts-expect-error
    reactdom.useFormState = jest.fn(() => [
      { ...initialState, submitted: true },
      'action',
    ]);
    // @ts-expect-error
    reactdom.useFormStatus = jest.fn(() => ({ pending: true }));
    await setupSearch({ initialState, action: serverAction });
    expect(screen.getByRole('status')).toHaveTextContent('loading');
  });
});

describe('Search with results', () => {
  beforeAll(() => {
    // @ts-expect-error
    reactdom.useFormState = jest.fn(() => [
      {
        ...initialState,
        success: true,
        submitted: true,
        query: 'dog',
        results: results.results,
        total: results.total,
        total_pages: results.total_pages,
      },
      'action',
    ]);
    // @ts-expect-error
    reactdom.useFormStatus = jest.fn(() => ({ pending: false }));
  });

  it('should display results', async () => {
    await setupSearch({ initialState, action: serverAction });
    const container = screen.getByTestId('search-results');
    const items = within(container).getAllByRole('img');
    expect(items).toHaveLength(results.results.length);
    results.results.forEach((result, index) => {
      expect(items[index]).toHaveAttribute(
        'src',
        expect.stringContaining(encodeURIComponent(result.urls.small))
      );
      expect(items[index]).toHaveAttribute('alt', result.alt_description);
    });
  });

  it('should provide success status to screen readers', async () => {
    await setupSearch({ initialState, action: serverAction });
    expect(screen.getByRole('status')).toHaveTextContent('success');
  });

  it('should display 2 pagination bars', async () => {
    await setupSearch({ initialState, action: serverAction });
    expect(
      screen.getAllByText(`Viewing page 1 of ${results.total_pages}`)
    ).toHaveLength(2);
    expect(
      screen.getAllByRole('button', { name: /previous page/i })
    ).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: /next page/i })).toHaveLength(
      2
    );
  });

  it('can paginate', async () => {
    const { user } = await setupSearch({ initialState, action: serverAction });
    await user.click(screen.getAllByRole('button', { name: /next page/i })[0]);
    expect(
      screen.getAllByText(`Viewing page 2 of ${results.total_pages}`)
    ).toHaveLength(2);
    await user.click(
      screen.getAllByRole('button', { name: /previous page/i })[0]
    );
    expect(
      screen.getAllByText(`Viewing page 1 of ${results.total_pages}`)
    ).toHaveLength(2);
  });
});

describe('Search with no results', () => {
  it('should display no results text', async () => {
    // @ts-expect-error
    reactdom.useFormState = jest.fn(() => [
      {
        ...initialState,
        success: true,
        submitted: true,
        query: 'dog',
      },
      'action',
    ]);
    // @ts-expect-error
    reactdom.useFormStatus = jest.fn(() => ({ pending: false }));
    await setupSearch({ initialState, action: serverAction });
    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });
});

describe('Search with errors', () => {
  it('should display a single error', async () => {
    const errorText = 'Something went wrong';
    // @ts-expect-error
    reactdom.useFormState = jest.fn(() => [
      {
        ...initialState,
        success: false,
        submitted: true,
        query: 'dog',
        errors: [errorText],
      },
      'action',
    ]);
    // @ts-expect-error
    reactdom.useFormStatus = jest.fn(() => ({ pending: false }));
    await setupSearch({ initialState, action: serverAction });
    expect(screen.getByText(`Error: ${errorText}`)).toBeInTheDocument();
  });

  it('should display multiple errors', async () => {
    const errors = ['Something went wrong', 'Something else went wrong'];
    // @ts-expect-error
    reactdom.useFormState = jest.fn(() => [
      {
        ...initialState,
        success: false,
        submitted: true,
        query: 'dog',
        errors,
      },
      'action',
    ]);
    // @ts-expect-error
    reactdom.useFormStatus = jest.fn(() => ({ pending: false }));
    await setupSearch({ initialState, action: serverAction });
    expect(screen.getByText(`Errors:`)).toBeInTheDocument();
    screen.getAllByRole('listitem').forEach((item, index) => {
      expect(item).toHaveTextContent(errors[index]);
    });
  });

  it('should provide errors to screen readers', async () => {
    const errors = ['Something went wrong', 'Something else went wrong'];
    // @ts-expect-error
    reactdom.useFormState = jest.fn(() => [
      {
        ...initialState,
        success: false,
        submitted: true,
        query: 'dog',
        errors,
      },
      'action',
    ]);
    // @ts-expect-error
    reactdom.useFormStatus = jest.fn(() => ({ pending: false }));
    await setupSearch({ initialState, action: serverAction });
    expect(screen.getByRole('status')).toHaveTextContent(errors.join(' '));
  });
});
