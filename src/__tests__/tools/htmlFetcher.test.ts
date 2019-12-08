//import nodeFetch from 'node-fetch';
import htmlFetcher from '../../tools/htmlFetcher';
import { OK } from 'http-status-codes';
import { NOTFOUND } from 'dns';

jest.mock('node-fetch');
const nodeFetch = require('node-fetch'); 

test('Fetch successfully', async () => {
  const successResult = 'success';
  const resp = {
    status: OK,
    text: () => new Promise((resolve) => resolve(successResult))
  };
  nodeFetch.mockResolvedValue(resp);

  const result = await htmlFetcher.fetch('http://testhost/');
  expect(result).toBe(successResult)
});

test('Fetch failed', async() => {
  const statusText = 'not found';
  const resp = {
    status: NOTFOUND,
    statusText
  };
  nodeFetch.mockResolvedValue(resp);
  return await htmlFetcher.fetch('http://testhost/').catch(e =>expect(e).toBeInstanceOf(Error));
});