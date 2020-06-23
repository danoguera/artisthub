import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react';
import moxios from 'moxios';
import Photographers from './Photographers';

describe('Photographers', () => {

  afterEach(() => {
    cleanup();
  });

  it('should render the differemte categories of photographs', (done) => {
    const { getAllByTestId } = render(
      <MemoryRouter>
        <Photographers />
      </MemoryRouter>
    );


    expect(getAllByTestId('photo-category')).toHaveLength(4);
    done();

  });

  it('should jump to a category page if the button is pressed', (done) => {

    const history = [];
    const { getAllByTestId } = render(
      <MemoryRouter>
        <Photographers history={history} />
      </MemoryRouter>
    );

    fireEvent.click(getAllByTestId('view-category')[2]);
    expect(history[0]).toMatch("/catsub/Photography/Models");
    done();

  });

})