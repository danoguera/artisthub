import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import moxios from 'moxios';
import Login from './Login';

describe('Login', () => {
  beforeEach(() => moxios.install());

  afterEach(() => {
    moxios.uninstall();
    cleanup();
  });


  it('should erase password when login credentials are incorrect', (done) => {
    const history = [];
    const { getByTestId, getByPlaceholderText } = render(
      <MemoryRouter>
        <Login history={history} />
      </MemoryRouter>
    );

    const input = getByPlaceholderText('Password');
    const event = {
      target: {
        name: 'password',
        value: '12345',
      },
    };

    fireEvent.change(input, event);   //Hasta aqui simulamos escribir una clave

    fireEvent.click(getByTestId('submit-btn'));
    expect(getByTestId('pwd-input').value).toBe("12345");

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: "asdfgggg"
      }).then(() => {

        expect(getByTestId('pwd-input').value).toBe("");
        done();
      })
    });

  });
  

  it('should jump to home if a user logins correctly', (done) => {
    const onUpdate = jest.fn();
    const history = [];
    const { getByTestId, getByPlaceholderText } = render(
      <MemoryRouter>
        <Login history={history} onUpdate={onUpdate} />
      </MemoryRouter>
    );

    fireEvent.click(getByTestId('submit-btn'));

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: "asdfgggg"
      }).then(() => {
        expect(history[0]).toMatch("/home"); 
        expect(localStorage.getItem("typeOfUser")).toBe("user");
        done();
      })
    });

  });

  it('should jump to homeProvider if a provider logins correctly', (done) => {
    const onChange = jest.fn();
    const onUpdate = jest.fn();
    const history = [];
    const { getByTestId, getByPlaceholderText } = render(
      <MemoryRouter>
        <Login history={history} onUpdate={onUpdate} onChange={onChange}/>
      </MemoryRouter>
    );

    const input = getByTestId('isProvLabel');

    fireEvent.click(input);   

    fireEvent.click(getByTestId('submit-btn'));

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: "asdfgggg"
      }).then(() => {
        expect(history[0]).toMatch("/homeProvider"); 
        expect(localStorage.getItem("typeOfUser")).toBe("provider");
        done();
      })
    });

  });
  

  })