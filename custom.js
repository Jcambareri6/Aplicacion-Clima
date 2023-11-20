const result = document.querySelector('.result')
const form = document.querySelector('.get-weather')
const countrySelect = document.querySelector('#country')
const citySelect = document.querySelector('#city')
const countriesAndCities = {
    Argentina: ['Buenos Aires', 'Córdoba', 'Rosario','tandil'],
    Brasil: ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte'],
    Chile: ['Santiago', 'Valparaíso', 'Antofagasta'],
    colombia:['Medellin','Bogota','Cali'],
    mexico:['Ciudad de México','Guadalajara','Cancún']
  }

form.addEventListener('submit', (e) => {
  e.preventDefault()

  if (citySelect.value === '' || countrySelect.value === '') {
    showError('Ambos campos son obligatorios...')
    return
  }
  //hace el llamado a la api
  callAPI(citySelect.value, countrySelect.value)
  //console.log(nameCity.value);
  //console.log(nameCountry.value);
})

function callAPI(city, country) {
  const apiId = 'ac1561e79b0837c1639ad161b9479fed' //41d1d7f5c2475b3a16167b30bc4f265c
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`

  fetch(url)
    .then((data) => {
      return data.json()
    })
    .then((dataJSON) => {
      if (dataJSON.cod === '404') {
        showError('Ciudad no encontrada...')
      } else {
        clearHTML()

        showWeather(dataJSON)
      }
      console.log(dataJSON)
    })
    .catch((error) => {
      console.log(error)
    })
}

function showWeather(data) {
  const {
    name,
    main: { temp, temp_min, temp_max },
    weather: [arr],
  } = data

  const degrees = kelvinToCentigrade(temp)
  const min = kelvinToCentigrade(temp_min)
  const max = kelvinToCentigrade(temp_max)

  const content = document.createElement('div')
  content.innerHTML = `
        <h5>Clima en ${name}</h5>
        <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
        <h2>${degrees}°C</h2>
        <p>Max: ${max}°C</p>
        <p>Min: ${min}°C</p>
    `

  result.appendChild(content)

  /* console.log(name);
    console.log(temp);
    console.log(temp_max);
    console.log(temp_min);
    console.log(arr.icon); */
}

function showError(message) {
  //console.log(message);
  const alert = document.createElement('p')
  alert.classList.add('alert-message')
  alert.innerHTML = message

  form.appendChild(alert)
  setTimeout(() => {
    alert.remove()
  }, 3000)
}

function kelvinToCentigrade(temp) {
  return parseInt(temp - 273.15)
}

  
 

  
  // función para llenar las opciones del select de ciudades
  function fillCityOptions(country) {
    // borramos las opciones anteriores
    citySelect.innerHTML = '<option value="">-- Seleccione una ciudad --</option>';
    // obtenemos las ciudades del país elegido
    const cities = countriesAndCities[country];
    // agregamos las opciones de ciudad al select
    cities.forEach(city => {
      const option = document.createElement('option');
      option.value = city;
      option.textContent = city;
      citySelect.appendChild(option);
    });
  }
  
  // evento que se activa cuando se elige un país en el select
  countrySelect.addEventListener('change', () => {
    // obtenemos el país elegido
    const country = countrySelect.value;
    if (country) {
      // llenamos las opciones del select de ciudades
      fillCityOptions(country);
    } else {
      // si no se eligió ningún país, borramos las opciones del select de ciudades
      citySelect.innerHTML = '<option value="">-- Seleccione una ciudad --</option>';
    }
  });
  
function clearHTML() {
  result.innerHTML = ''
}
