import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Router, MemoryRouter, Route} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import puppeteer from 'puppeteer';
import App from './App';
import { delay } from 'moxios';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/aH/i);
  expect(linkElement).toBeInTheDocument();
});

describe('App', () => {
  let browser;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
    });
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should render home view after signin', async () => {
    jest.setTimeout(10000);    
    const page = await browser.newPage();

    await page.goto('http://localhost:3001');

    await page.waitForSelector('#email');
 

    await page.type('#email', 'jairo@test.com', { delay: 100 });
    await page.type('#password', '12345', { delay: 100 });
   
    await page.click('#submit-btn');
    
    await page.waitForSelector('.mainContainer > h1');
    await page.waitForSelector('div > h3');
    const message = await page.$eval('.mainContainer > h1', el => el.innerHTML);
    
    expect(message).toMatch(/Tell us which service you are looking for:/);
    page.close();
  });

  it('should render homeProvider view after signin', async () => {
    jest.setTimeout(10000);
    const page = await browser.newPage();

    await page.goto('http://localhost:3001');

    await page.waitForSelector('#email');
 

    await page.type('#email', 'provider@test.com', { delay: 10 });
    await page.type('#password', '12345', { delay: 10 });
    await page.click('#isProvider');
    await page.click('#submit-btn');
    
    await page.waitForSelector('.mainProvContainer > h1');
    await page.waitForSelector('div > h3');
    const message = await page.$eval('.mainProvContainer > h1', el => el.innerHTML);
    
    expect(message).toMatch(/Tell us which service you want to offer:/);
    page.close();
  });
});