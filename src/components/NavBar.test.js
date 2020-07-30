import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from './NavBar';

describe('NavBar', () => {
  it('should render signin and signup links when not authenticated', () => {
    const { container, getByText } = render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(getByText('Sign In')).toBeInTheDocument();
    expect(getByText('Sign Up')).toBeInTheDocument();
  });

  it('should render Sign Out link when authenticated', () => {
    localStorage.setItem('token', 'loquesea');

    const { getByText } = render(
      <MemoryRouter>
        <NavBar token={"loqueseaa"}/>
      </MemoryRouter>
    );

    localStorage.removeItem('token');

    expect(getByText('Sign Out')).toBeInTheDocument();
    
  });


  it('should have a link to providerHome if the user is a provider..', () => {
    localStorage.setItem('typeOfUser', 'provider');

    const { getByText } = render(
      <MemoryRouter>
        <NavBar token={"loqueseaa"}/>
      </MemoryRouter>
    );

    localStorage.removeItem('typeOfUser');

    expect(document.querySelector("a").getAttribute("href")).toBe("/homeProvider" );
    //expect(getByText('homeProvider')).toBeInTheDocument();
    
  });

});