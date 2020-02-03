import fetch from 'isomorphic-unfetch';

const CustomFetch = (url: RequestInfo, options?: RequestInit) => {
  return fetch(url, options).then(async (response: Response) => {
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    return result;
  });
};

export default CustomFetch;