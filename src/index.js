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
            <img src="${c.flags.svg}" alt="${c.flags.alt}"/> 
            <span>${c.name.common}</span>
        </h2>
        <p>Capital: ${c.capital[0]}</p>
        <p>Population: ${c.population}</p>
        <p>Languages: ${languagesStr}</p>
    `;
}

const onInput = async (e) => {
    let items = await fetchCOuntriesByName(e.target.value.trim());
    
    console.log(items);
    if (items.length === 1) {
        renderCountry(items[0]);
        return;
    }

    // if (items.length > 1) {
    //     //renderCountry(items[0]);
    //     return;
    // }
};

input.oninput = onInput;