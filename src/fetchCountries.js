const url = 'https://restcountries.com/v3.1/name/';
const SEARCH_FILTER = '?fields=name,capital,population,flags,languages';

export const fetchCountries = name => {
  return fetch(`${url}${name}${SEARCH_FILTER}`).then(response => {
    return response.json();
  });
};
