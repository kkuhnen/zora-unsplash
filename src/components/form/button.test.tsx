/**
 * @jest-environment jsdom
 */
import reactdom from 'react-dom';
import { render, screen } from '@testing-library/react';
import { Button } from './button';

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormStatus: null,
}));

describe('Button', () => {
  it('aria-disabled is false when form is not pending', () => {
    // @ts-expect-error
    reactdom.useFormStatus = jest.fn(() => ({ pending: false }));
    render(<Button>Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-disabled',
      'false'
    );
  });

  it('aria-disabled is true when form is pending', () => {
    // @ts-expect-error
    reactdom.useFormStatus = jest.fn(() => ({ pending: true }));
    render(<Button>Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
  });
});
