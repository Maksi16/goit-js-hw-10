import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
//import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const refs = {
  inputEl: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.inputEl.addEventListener(
  'input',
  debounce(onNameCountryInput, DEBOUNCE_DELAY)
);

function onNameCountryInput() {
  if (refs.inputEl.value === '') {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    return;
  }
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';

  const countryName = refs.inputEl.value.trim();
  fetchCountries(countryName).then(renderCounties).catch(onSearchError);
}
function renderCounties(country) {
  const markupInfo = countryCardInfo(country);
  const markupList = countryList(country);

  if (country.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (country.length > 1 && country.length <= 10) {
    refs.countryList.insertAdjacentHTML('beforeend', markupList);
  } else {
    refs.countryInfo.insertAdjacentHTML('beforeend', markupInfo);
  }
}
function countryCardInfo(country) {
  return country
    .map(({ name, capital, population, flags, languages }) => {
      const countryLanguages = createLanguages(languages);
      return `<img class="country-img" src="${flags.svg}" alt="${name}" width="60px">
      <h1 class="country-title">${name.official}</h1>
      <p class="country-text"><span class="country-wrap">Capital:</span>${capital}</p>
      <p class="country-text"><span class="country-wrap">Population:</span>${population}</p>
      <p class="country-text"><span class="country-wrap">Languages:</span>${countryLanguages}</p>`;
    })
    .join('');
}
function createLanguages(languages) {
  return Object.values(languages).join(', ');
}
function countryList(country) {
  return country
    .map(({ name, flags }) => {
      return `<li class="country-item">
        <img src="${flags.svg}" alt="${name}" class="country-icon"/>${name.official}
      </li>`;
    })
    .join('');
}
function onSearchError(error) {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
