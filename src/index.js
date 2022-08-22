import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
//import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const refs = {
  inputEl: document.querySelector('#search-box'),
};

refs.inputEl.addEventListener(
  'input',
  debounce(onNameCountriInput, DEBOUNCE_DELAY)
);

function onNameCountriInput(e) {
  const name = refs.inputEl.value.trim();

  fetchCountries(name)
    .then(countrie => {
      if (countrie.lengch > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.',
          { timeout: 2000, fontSize: '16px', width: '320px' }
        );
      }
      console.log(countrie);
    })

    .catch(searchError);
}

function searchError(error) {
  error => Notiflix.Notify.failure('Oops, there is no country with that name');
}
