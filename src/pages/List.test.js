import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react';
import moxios from 'moxios';
import List from './List';

describe('List', () => {
    beforeEach(() => moxios.install());
  
    afterEach(() => {
      moxios.uninstall();
      cleanup();
    });

  it('should render the posts list', (done) => {
    const match = { params: {category: "photugraphy", subcategory:"aerial"} };   //Toca pasar este props
    const history = [];   //Toca pasar este props
    const { getAllByTestId } = render(
      <MemoryRouter>
        <List match={match} history={history} />
      </MemoryRouter>
    );


    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [{ _id: 1111, title: "Post 1", description: "Post 1 description", post_image: "http://loquesea.com/image1.jpg" },
                  { _id: 2222, title: "Post 2", description: "Post 2 description", post_image: "http://loquesea.com/image2.jpg" }]
      }).then(() => {
        expect(getAllByTestId('post')).toHaveLength(2);
        done();
      })
    });
  });

  it('should redirect to login if an error occurs', (done) => {
    const match = { params: {category: "photugraphy", subcategory:"aerial"} }; 
    const history = [];  
    const { getByText } = render(
      <MemoryRouter>
        <List match={match} history={history} />
      </MemoryRouter>
    );

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: [],
      }).then(() => {
        
        expect(history[0]).toMatch("/login");;
        done();
      })
    });

  });


  it('should jump to edit post page if edit button is clicked', (done) => {
    const match = { params: {category: "photugraphy", subcategory:"aerial"} }; 
    const history = [];  
      const { getByTestId } = render(
        <MemoryRouter>
          <List match={match} history={history} />
        </MemoryRouter>
      );
  
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: [{ _id: 1111, title: "Post 1", description: "Post 1 description", post_image: "http://loquesea.com/image.jpg" }]
        }).then(() => {
          fireEvent.click(getByTestId('post-view'));
          expect(history[0]).toMatch("/posts/1111");
          done();
        })
      });
  });



  })