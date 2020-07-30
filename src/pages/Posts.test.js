import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react';
import moxios from 'moxios';
import Posts from './Posts';

describe('Posts', () => {
    beforeEach(() => moxios.install());
  
    afterEach(() => {
      moxios.uninstall();
      cleanup();
    });

  it('should render a post', (done) => {
    const match = { params: {id: 1111} };   //Toca pasar este props
    const history = [];   //Toca pasar este props
    const { getAllByTestId } = render(
      <MemoryRouter>
        <Posts match={match} history={history} />
      </MemoryRouter>
    );


    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [{ _id: 1111, title: "Post 1", description: "Post 1 description", post_image: "http://loquesea.com/image.jpg" }]
      }).then(() => {
        expect(getAllByTestId('post')).toHaveLength(1);
        done();
      })
    });

  });

  it('should show an error when not possible to fetch a post', (done) => {
    const match = { params: {id: 1111} }; 
    const history = [];  
    const { getByText } = render(
      <MemoryRouter>
        <Posts match={match} history={history} />
      </MemoryRouter>
    );

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: [],
      }).then(() => {
        
        expect(getByText(/No se puede desplegar/)).toBeInTheDocument();
        done();
      })
    });

  });


  it('should render edit and delete buttons if typeOfUser=provider', (done) => {
    localStorage.setItem("typeOfUser","provider")
    const match = { params: {id: 1111} };   //Toca pasar este props
    const { getByText } = render(
      <MemoryRouter>
        <Posts match={match} />
      </MemoryRouter>
    );

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [{ _id: 1111, title: "Post 1", description: "Post 1 description", post_image: "http://loquesea.com/image.jpg" }]
      }).then(() => {
        expect(getByText(/Delete/)).toBeInTheDocument();
        expect(getByText(/Edit/)).toBeInTheDocument();
        done();
      })
    });
  });

  it('should jump to edit post page if edit button is clicked', (done) => {
      localStorage.setItem("typeOfUser","provider")
      const match = { params: {id: 1111} };   //Toca pasar este props
      const history=[];
      const { getByTestId } = render(
        <MemoryRouter>
          <Posts match={match} history={history} />
        </MemoryRouter>
      );
  
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: [{ _id: 1111, title: "Post 1", description: "Post 1 description", post_image: "http://loquesea.com/image.jpg" }]
        }).then(() => {
          fireEvent.click(getByTestId('post-edit'));
          expect(history[0]).toMatch("/posts/create/1111");
          done();
        })
      });
  });

  it('should delete a post if delete button is clicked', async (done) => {
    window.alert = jest.fn();
    localStorage.setItem("typeOfUser","provider")
    const match = { params: {id: 1111} };   //Toca pasar este props
    const history=[];
    const { getByTestId } = render(
      <MemoryRouter>
        <Posts match={match} history={history} />
      </MemoryRouter>
    );

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [{ _id: 1111, title: "Post 1", description: "Post 1 description", post_image: "http://loquesea.com/image.jpg" }]
      })
    });

    const deleteButton = await waitForElement(() => getByTestId('post-delete'))
    fireEvent.click(deleteButton)
    
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      
      request.respondWith({
        status: 200,
        response: []
      }).then(() => {
        //El domJS no implementa el alert
        expect(history[0]).toMatch("/homeProvider");
        done();
      })
    });



});



  })