const socket = io();

socket.on('message', (message) => {
  console.log(message);
});

const sendMessageForm = document.getElementById('message-form');
const locationBtn = document.getElementById('location');

sendMessageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(sendMessageForm).entries());
  socket.emit('sendMessage', formData.message);
  e.target.elements.message.value = '';
});

locationBtn.addEventListener('click', async (e) => {
  if (!navigator.geolocation) {
    return console.log('geolocation not supported');
  }
  new Promise(
    (res, rej) => navigator.geolocation.getCurrentPosition(res, rej)
  )
    .then((position) => socket.emit('sendLocation', { latitude: position.coords.latitude, longitude: position.coords.longitude }))
    .catch((err) => console.log('could not get location', err));
});