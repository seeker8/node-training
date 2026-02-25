console.log('Loaded');


const weatherForm = document.querySelector('form');
weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const forecastContainer = document.getElementById('forecast-container');
  const error = document.getElementById('error');
  const loaderElem = document.getElementById('loader');
  const search = document.getElementById('address');

  error.classList.toggle('hidden', !error.classList.contains('hidden'));
  forecastContainer.classList.toggle('hidden', !forecastContainer.classList.contains('hidden'));
  loaderElem.classList.remove('hidden');
  const addressLocation = encodeURIComponent(search.value);

  fetch(`http://localhost:3000/weather?address=${addressLocation}`).then((response) => {
    response.json().then((data) => {
      loaderElem.classList.add('hidden');
      if (data.error) {
        console.log(data.error);
        error.classList.toggle('hidden');
        error.classList.toggle('error');
        error.textContent = JSON.stringify(data.error);
      }
      else {
        const locationElem = document.getElementById('location');
        const forecastElem = document.getElementById('forecast');
        locationElem.textContent = `${data.name}, ${data.region}`
        forecastElem.textContent = `The temperature is ${data.temperature}${data.units}`
        console.log(data)
      }
    });
  });
  console.log('submit', addressLocation);
});