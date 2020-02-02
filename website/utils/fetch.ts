import fetch from 'isomorphic-unfetch';

const CustomFetch = (url: RequestInfo, options?: RequestInit) => {
  return fetch(url, options);
};

export default CustomFetch;