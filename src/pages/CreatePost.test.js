import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup,  fireEvent, waitForElement } from '@testing-library/react';
import moxios from 'moxios';
import CreatePost from './CreatePost';

describe('CreatePost', () => {
  beforeEach(() => moxios.install());
  
  afterEach(() => {
    moxios.uninstall();
    cleanup();
  });

  it('should render correctly', () => {
    const match = { params: { } };
    const { container } = render(<CreatePost match={match} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should change data as user writes in the input boxes ', (done) => {
    const history = [];
    const match = { params: { } };
    const { getByTestId, getByPlaceholderText } = render(
      <MemoryRouter>
        <CreatePost match={match} history={history} />
      </MemoryRouter>
    );

    const input = getByPlaceholderText('Enter your service title');
    const event = {
      target: {
        name: 'title',
        value: 'Description 1',
      },
    };

    fireEvent.change(input, event);   //Hasta aqui simulamos escribir una clave

    expect(getByTestId('post-title').value).toBe("Description 1");
    done();
  });

  it('should change data if user selects from dropdown ', (done) => {
    const history = [];
    const match = { params: { } };
    const { getByTestId, getByPlaceholderText } = render(
      <MemoryRouter>
        <CreatePost match={match} history={history} />
      </MemoryRouter>
    );

    const input = getByTestId('category');
    const event = {
      target: {
        name: 'category',
        value: 'Videography',
      },
    };

    fireEvent.change(input, event);   //Hasta aqui simulamos escribir una clave

    expect(getByTestId('category').value).toBe("Videography");
    done();
  });


  it('should create post ', (done) => {
    const history = [];
    const match = { params: { } };
    const { getByTestId, getByPlaceholderText } = render(
      <MemoryRouter>
        <CreatePost match={match} history={history} />
      </MemoryRouter>
    );

    const input = getByPlaceholderText('Enter your service title');
    const event = {
      target: {
        name: 'title',
        value: 'Description 1',
      },
    };

    fireEvent.change(input, event); 

    expect(getByTestId('post-title').value).toBe("Description 1");

    fireEvent.click(getByTestId('submit-btn'));

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
       status: 200,
       response: {_id:1111, title:"Post 1", description:"Post 1 description", post_image:"http://loquesea.com/image.jpg"}
        }).then(() => {
       
       expect(history[0]).toMatch("/posts/1111"); 
       done();
      })
    });

  });


  it('should display an alert if an error occurs while creating a post ', (done) => {
    window.alert = jest.fn();
    const history = [];
    const match = { params: { } };
    const { getByTestId, getByPlaceholderText } = render(
      <MemoryRouter>
        <CreatePost match={match} history={history} />
      </MemoryRouter>
    );

    const input = getByPlaceholderText('Enter your service title');
    const event = {
      target: {
        name: 'title',
        value: 'Description 1',
      },
    };

    fireEvent.change(input, event); 

    expect(getByTestId('post-title').value).toBe("Description 1");

    fireEvent.click(getByTestId('submit-btn'));

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
       status: 404,
       response: {}
        }).then(() => {
          //No hay mucho que porbar aca, si se genera error, solo hay un alertBox.. todo sigue igual
          expect(getByTestId('post-title').value).toBe("Description 1");
       done();
      })
    });

  });

  it('should render the form with the data of an existing post ', (done) => {
    const history = [];
    const match = { params: { id: 1111} };
    const { getByTestId, getByPlaceholderText } = render(
      <MemoryRouter>
        <CreatePost match={match} history={history} />
      </MemoryRouter>
    );

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
       status: 200,
       response: {_id:1111, title:"Post 1", description:"Post 1 description", post_image:"http://loquesea.com/image.jpg"}
        }).then(() => {
       
       expect(getByTestId('post-title').value).toBe("Post 1");
       done();
      })
    });

    

  });


  it('should create post with image ', (done) => {
    const history = [];
    const match = { params: { } };
    const { getByTestId, getByPlaceholderText } = render(
      <MemoryRouter>
        <CreatePost match={match} history={history} />
      </MemoryRouter>
    );

    const file = new File(['(¬?_?)'], 'chucknorris.png', { type: 'image/png' })
    const imageInput = getByTestId("post_image")
    fireEvent.change(imageInput, { target: { files: [file] } })

    fireEvent.click(getByTestId('submit-btn'));

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
       status: 200,
       response: {_id:1111, title:"Post 1", description:"Post 1 description", post_image:"http://loquesea.com/image.jpg"}
        }).then(() => {
       
       expect(history[0]).toMatch("/posts/1111"); 
       done();
      })
    });

  });




})