import { OK } from 'http-status-codes';
import nodeFetch from 'node-fetch';

const fetch = async (url: string): Promise<string> => {
    const response = await nodeFetch(url);
    if (response.status !== OK) {
        throw new Error(`Problems fetching url – ${response.statusText}`);
    }

    return await response.text();
}

export default { fetch };