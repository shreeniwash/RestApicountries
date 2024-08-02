const myCountry = new URLSearchParams(window.location.search).get('name');
const themeLight = document.querySelector('.theme-light');
const themeDark = document.querySelector('.theme-dark');

console.log(myCountry);
fetch(`https://restcountries.com/v3.1/name/${myCountry}?fullText=true`)
    .then(res => res.json())
    .then(([countrydata]) => {
        console.log(countrydata);
        // Create a sub-container for country details
        const detailsContainer = document.querySelector('.country-details');
        const detailsSubContainer = document.createElement('div');
        detailsSubContainer.classList.add('details-sub-container');

        // Function to fetch and return border countries
        const fetchBorderCountries = async (borders) => {
            const borderNames = await Promise.all(borders.map(async (border) => {
                const res = await fetch(`https://restcountries.com/v3.1/alpha/${border}`);
                const bordercountry = await res.json();
                return bordercountry[0].name.common;
            }));
            return borderNames;
        };

        // Populate the sub-container with country details
        detailsSubContainer.innerHTML = `
            <img src="${countrydata.flags.svg}" alt="flag">
            <div class="details-container">
                <h1>${countrydata.name.common}</h1>
                <div class="details-text">
                    <p><b>Native Name: </b>${Object.values(countrydata.name.nativeName)[0].common}</p>
                    <p><b>Population: </b>${countrydata.population.toLocaleString('en-IN')}</p>
                    <p><b>Region: </b>${countrydata.region}</p>
                    <p><b>Sub Region: </b>${countrydata.subregion}</p>
                    <p><b>Capital: </b>${countrydata.capital.join(', ')}</p>
                    <p><b>Top Level Domain: </b>${countrydata.tld.join(', ')}</p>
                    <p><b>Currencies: </b>${Object.values(countrydata.currencies).map(curr => curr.name).join(', ')}</p>
                    <p><b>Languages: </b>${Object.values(countrydata.languages).join(', ')}</p>
                </div>
                <div class="border-countries">
                    <p><b>Border Countries: </b><span id="border-countries">${countrydata.borders ? 'Loading...' : 'None'}</span></p>
                </div>
            </div>
        `;

        // Append the sub-container to the main container
        detailsContainer.appendChild(detailsSubContainer);

        // Fetch and display border countries
        if (countrydata.borders) {
            fetchBorderCountries(countrydata.borders).then(borderNames => {
                const borderCountriesSpan = document.getElementById('border-countries');
                borderCountriesSpan.innerHTML = borderNames.map(borderName => `<a href="/RestCountriesApi/country.html?name=${borderName}">${borderName}</a>`).join(', ');
            }).catch(error => {
                console.error('Error fetching border countries:', error);
            });
        }
    })
    .catch(error => {
        console.error('Error fetching country data:', error);
    });

function toggleTheme() {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
        themeLight.style.display = 'none';
        themeDark.style.display = 'block';
    } else {
        themeLight.style.display = 'block';
        themeDark.style.display = 'none';
    }
}

themeLight.addEventListener('click', toggleTheme);
themeDark.addEventListener('click', toggleTheme);

// Initialize the theme on page load
if (document.body.classList.contains('dark')) {
    themeLight.style.display = 'none';
    themeDark.style.display = 'block';
} else {
    themeLight.style.display = 'block';
    themeDark.style.display = 'none';
}
