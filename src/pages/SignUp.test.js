import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import moxios from 'moxios';
import SignUp from './SignUp';

describe('SignUp', () => {
  beforeEach(() => moxios.install());
  
  afterEach(() => {
    moxios.uninstall();
    cleanup();
  });

  it('should render correctly', () => {
    const { container } = render(<SignUp />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should change data as user writes in the input boxes ', (done) => {
    const { getByTestId, getByPlaceholderText } = render(
        <SignUp  />
    );

    const input = getByPlaceholderText('Type your name');
    const event = {
      target: {
        name: 'name',
        value: 'Peter',
      },
    };

    fireEvent.change(input, event); 

    expect(getByTestId('name').value).toBe("Peter");
    done();
  });

  it('should change type of User  ', (done) => {
    const { getByTestId, getByPlaceholderText } = render(
        <SignUp  />
    );

    const input = getByTestId('typeOfUser');
    const event = {
      target: {
        name: 'typeOfUser',
        value: 'provider',
      },
    };

    fireEvent.change(input, event); 

    expect(getByTestId('typeOfUser').value).toBe("provider");
    done();
  });

  it('should jump to home after user signup', (done) => {
    const history = [];
    window.alert = jest.fn();

    const { getByTestId, getByPlaceholderText } = render(
        <SignUp history={history}/>
    );

    fireEvent.click(getByTestId('submit-btn'));

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
       status: 200,
       response: {"message":"OK"}
        }).then(() => {
       
       expect(history[0]).toMatch("/home"); 
       done();
      })
    });

  });

  it('should validate type of User at signup', (done) => {
    const history = [];
    window.alert = jest.fn();

    const { getByTestId, getByPlaceholderText } = render(
        <SignUp history={history}/>
    );

    const input = getByTestId('typeOfUser');
    const event = {
      target: {
        name: 'typeOfUser',
        value: 'provider',
      },
    };

    fireEvent.change(input, event); 


    fireEvent.click(getByTestId('submit-btn'));

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
       status: 200,
       response: {"message":"OK"}
        }).then(() => {
       
       expect(history[0]).toMatch("/home"); 
       done();
      })
    });

  });

  it('should show an error if signup fails', (done) => {
    const history = [];
    window.alert = jest.fn();

    const { getByTestId, getByPlaceholderText } = render(
        <SignUp history={history}/>
    );

    fireEvent.click(getByTestId('submit-btn'));

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
       status: 400,
       response: {"message":"Not Ok"}
        }).then(() => {
          expect(window.alert).toHaveBeenCalled();  //Esto es correcto?
       done();
      })
    });

  });

})