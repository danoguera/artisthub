import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter, Router} from 'react-router-dom';
import { createMemoryHistory } from "history";
import HomeProvider from './HomeProvider';

describe('HomeProvider', () => {

  beforeEach(() => {
    cleanup();
  });

  afterEach(() => {
    cleanup();
  });

  it('should render correctly', () => {
    const { container } = render(
      <MemoryRouter>
        <HomeProvider />
      </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
  });


   it('should jump to Create Service page page when button is clicked', (done) => {
    const history = createMemoryHistory();
    const { getByText } = render(
        <Router history={history} >
            <HomeProvider/>
        </Router>
    );

      fireEvent.click(getByText(/Create Service/i))
      expect(history.location.pathname).toMatch("/posts/create"); 
      done();

   });

   it('should jump to List posts page when button is clicked', (done) => {
    const history = createMemoryHistory();
    const { getByText } = render(
        <Router history={history} >
            <HomeProvider/>
        </Router>
    );

      fireEvent.click(getByText(/List Services/i))
      expect(history.location.pathname).toMatch("/list"); 
      done();

   });

})