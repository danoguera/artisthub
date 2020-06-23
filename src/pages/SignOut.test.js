import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignOut from './SignOut';

describe('SignOut', () => {
  it('should render correctly', () => {
    const onUpdate = jest.fn();
    const { container } = render(<SignOut onUpdate={onUpdate}/>);

    expect(container.firstChild).toMatchSnapshot();
  });

})