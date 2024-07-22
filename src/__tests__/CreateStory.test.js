import React from 'react';
import { render, screen } from '@testing-library/react';
import CreateStory from '../pages/create';
import { Provider } from 'react-redux';
import { store } from '../store/store';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    };
  },
}));

describe('CreateStory', () => {
  it('renders the create story form', () => {
    render(
      <Provider store={store}>
        <CreateStory />
      </Provider>
    );

    expect(screen.getByText('Create Your Story')).toBeInTheDocument();
    expect(screen.getByText('Select a Genre')).toBeInTheDocument();
    expect(screen.getByText('Select a Setting')).toBeInTheDocument();
    expect(screen.getByText('Custom Character (Optional)')).toBeInTheDocument();
    expect(screen.getByText('Custom Plot Element (Optional)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create Story' })).toBeInTheDocument();
  });
});