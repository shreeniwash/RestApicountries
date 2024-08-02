const countriesContainer=document.querySelector('.countries-container')
const filterByRegion=document.querySelector('.filter-by-region')
const search=document.querySelector('.search-container input')
const themeLight=document.querySelector('.theme-light')
const themeDark=document.querySelector('.theme-dark')


let allcountriesdata;

fetch('https://restcountries.com/v3.1/all')
.then((Response) =>Response.json())
.then((data)=>{
    renderCountries(data)
    allcountriesdata=data;
})


filterByRegion.addEventListener('change',(e)=>{
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((Response) =>Response.json())
    .then(renderCountries)
       
    });
//     .then((data)=>{
//         countriesContainer.innerHTML='';
//         data.forEach((country) => {
//             const countryCard=document.createElement('a')
//             countryCard.classList.add('country-card')
//             countryCard.href=`./country.html?name=${country.name.official}`;
//             countryCard.innerHTML=`
//                    <div class="card-text">
//                     <img src="${country.flags.svg}" alt="" srcset="">
//                     <h3 class="card-tittle">${country.name.official}</h3>
//                     <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
//                     <p><b>Region: </b>${country.region}</p>
//                     <p><b>Capital: </b>${country.capital}</p>
//                     </div>
//     `
//     countriesContainer.append(countryCard);
//         });
//     })
 

function renderCountries(data){
    countriesContainer.innerHTML='';
    data.forEach((country) => {
        console.log(country)
        const countryCard=document.createElement('a')
        countryCard.classList.add('country-card')
        countryCard.href=`./country.html?name=${country.name.official}`;
        countryCard.innerHTML=`
               <div class="card-text">
                <img src="${country.flags.svg}" alt="" srcset="">
                <h3 class="card-tittle">${country.name.official}</h3>
                <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
                <p><b>Region: </b>${country.region}</p>
                <p><b>Capital: </b>${country.capital}</p>
                </div>
`
countriesContainer.append(countryCard);
    });
}


search.addEventListener('input',(e)=>{
    // console.log(e.target.value)
    // console.log(allcountriesdata)

    const filterdata=allcountriesdata.filter((country)=>country.name.common.toLowerCase().includes(e.target.value.toLowerCase()));
    renderCountries(filterdata);
})

function toggleTheme(){
    document.body.classList.toggle('dark');
    if(document.body.classList.contains('dark')){
     themeLight.style.display='none';
     themeDark.style.display='block'
    }else{
        themeLight.style.display='block';
        themeDark.style.display='none'
    }
}
themeLight.addEventListener('click',toggleTheme)
themeDark.addEventListener('click',toggleTheme)
//initial page load
if(document.body.classList.contains('dark')){
    themeLight.style.display='block';
    themeDark.style.display='none';
   }else{
       themeLight.style.display='block';
       themeDark.style.display='none'
   }