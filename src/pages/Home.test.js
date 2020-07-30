import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter, Router} from 'react-router-dom';
import { createMemoryHistory } from "history";
import Home from './Home';

describe('Home', () => {

  afterEach(() => {
    cleanup();
  });

  it('should render correctly', () => {
    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should send the user to photographers posts when button is clicked', (done) => {
    const history = [];   //Toca pasar este props
    const { getByTestId } = render(
        <MemoryRouter>
            <Home history={history} />
        </MemoryRouter>
    );

      fireEvent.click(getByTestId('photography-view'));
      expect(history[0]).toMatch("/photographers"); 
      done();

   });

   

   // check that the content changed to the new page
   //expect(container.innerHTML).toMatch('You are on the about page')

   it('should jump to Video page page when button is clicked', (done) => {
    const history = createMemoryHistory();
    const { getByText } = render(
        <Router history={history} >
            <Home/>
        </Router>
    );

      fireEvent.click(getByText(/Video/i))
      expect(history.location.pathname).toMatch("/category/Videography"); 
      done();

   });

   it('should jump to Music page page when button is clicked', (done) => {
    const history = createMemoryHistory();
    const { getByText } = render(
        <Router history={history} >
            <Home/>
        </Router>
    );

      fireEvent.click(getByText(/Music/i))
      expect(history.location.pathname).toMatch("/category/Music"); 
      done();

   });

})