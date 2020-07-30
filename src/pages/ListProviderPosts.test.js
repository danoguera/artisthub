import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import moxios from 'moxios';
import ListProviderPosts from './ListProviderPosts';

describe('ListProviderPosts', () => {
    beforeEach(() => moxios.install());
  
    afterEach(() => {
      moxios.uninstall();
      cleanup();
    });

  it('should render a list of providers posts', (done) => {
    const location = { pathname: '/category/music' };   //Toca pasar este props
    const history = [];   //Toca pasar este props
    const { getAllByTestId } = render(
      <MemoryRouter>
        <ListProviderPosts />
      </MemoryRouter>
    );
  
  
       moxios.wait(() => {
         const request = moxios.requests.mostRecent();
         request.respondWith({
           status: 200,
           response: [{_id:111, title:"Post 1", description:"Post 1 description", post_image:"http://loquesea.com/image.jpg"},
                     {_id:222, title:"Post 2", description:"Post 2 description", post_image:"http://loquesea.com/image.jpg"}]
         }).then(() => {
           expect(getAllByTestId('provider-post').length).toBe(2);  //Se reciben los dos posts que se mandaron?
           done();
         })
       });

    });
  
    it('should send the user to login if an error occurs', (done) => {
        const location = { pathname: '/category/music' };   //Toca pasar este props
        const history = [];   //Toca pasar este props
        const { getAllByTestId } = render(
            <MemoryRouter>
                <ListProviderPosts history={history} />
            </MemoryRouter>
        );
  
  
       moxios.wait(() => {
         const request = moxios.requests.mostRecent();
         request.respondWith({
           status: 404,
           response: []
         }).then(() => {
           expect(history[0]).toMatch("/login"); 
           done();
         })
       });

    });

    it('should send the user to a specific post if the View Post button is clicked', (done) => {
      const location = { pathname: '/category/music' };   //Toca pasar este props
      const history = [];   //Toca pasar este props
      const { getAllByTestId } = render(
          <MemoryRouter>
              <ListProviderPosts history={history} />
          </MemoryRouter>
      );

     moxios.wait(() => {
       const request = moxios.requests.mostRecent();
       request.respondWith({
        status: 200,
        response: [{_id:1111, title:"Post 1", description:"Post 1 description", post_image:"http://loquesea.com/image.jpg"},
                  {_id:2222, title:"Post 2", description:"Post 2 description", post_image:"http://loquesea.com/image2.jpg"},
                  {_id:3333, title:"Post 3", description:"Post 3 description", post_image:"http://loquesea.com/image3.jpg"}]
      }).then(() => {
        fireEvent.click(getAllByTestId('post-view')[2]);
        expect(history[0]).toMatch("/posts/3333"); 
        done();
       })
     });

  });

  it('should display a No Posts message if the user has no posts', (done) => {
    const history = [];   //Toca pasar este props
    const { getByText } = render(
        <MemoryRouter>
            <ListProviderPosts history={history} />
        </MemoryRouter>
    );

   moxios.wait(() => {
     const request = moxios.requests.mostRecent();
     request.respondWith({
      status: 200,
      response: []
    }).then(() => {
      expect(getByText(/You have no posts yet/)).toBeInTheDocument();
      done();
     })
   });

});

  })