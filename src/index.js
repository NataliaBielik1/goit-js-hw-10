import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('input');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

async function fetchCOuntriesByName(name) {
    const response = await fetch('https://restcountries.com/v3.1/name/' + name);
    return response.json();
}

function renderCountry(c) {
    let languages = [];
    for (const key in c.languages) {
         languages.push(c.languages[key]);
    }

    let languagesStr = languages.join(', ');

    countryInfo.innerHTML = `
        <h2>
            <img src="${c.flags.svg}" class="flag" alt="${c.flags.alt}" /> 
            <span>${c.name.common}</span>
        </h2>
        <p>Capital: ${c.capital[0]}</p>
        <p>Population: ${c.population}</p>
        <p>Languages: ${languagesStr}</p>
    `;
}

function renderCountryList(items) {
    countryList.innerHTML = items.map(c => `<li><img src="${c.flags.svg}" alt="${c.flags.alt}" class="flag" /> <span>${c.name.common}</span></li>`).join('');
}

const onInput = async (e) => {
    let name = e.target.value.trim();
    
    let items = await fetchCOuntriesByName(name);
    
    if (items.length === 1) {
        renderCountry(items[0]);
        return;
    }

    if (items.length > 1) {
         renderCountryList(items);
         return;
    }
};

input.oninput = onInput;