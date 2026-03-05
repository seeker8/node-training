const socket = io();

const sendMessageForm = document.getElementById('message-form');
const locationBtn = document.getElementById('location');
const messageFormInput = document.getElementById('message');
const sendMessageBtn = document.getElementById('send-message');
const messagesContainer = document.getElementById('messages');


// templates
const messageTemplate = document.getElementById('message-template').innerHTML;

socket.on('message', (message) => {
  console.log(message);
  const html = Mustache.render(messageTemplate, { message });
  messagesContainer.insertAdjacentHTML('beforeend', html);
});

sendMessageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(sendMessageForm).entries());
  if (formData.message) {
    sendMessageBtn.setAttribute('disabled', 'disabled');
    messageFormInput.value = '';
    messageFormInput.focus();
    socket.emit('sendMessage', formData.message, (error) => {
      if (error) {
        return console.log(error);
      }
      console.log('message was received.');
      sendMessageBtn.removeAttribute('disabled');
    });
  }
});

locationBtn.addEventListener('click', async (e) => {
  if (!navigator.geolocation) {
    return console.log('geolocation not supported');
  }
  new Promise(
    (res, rej) => {
      locationBtn.setAttribute('disabled', 'disabled');
      navigator.geolocation.getCurrentPosition(res, rej)
    })
    .then((position) => {
      socket.emit(
        'sendLocation',
        { latitude: position.coords.latitude, longitude: position.coords.longitude },
        (error) => {
          if (error) {
            return console.log(error);
          }
          console.log('Location shared!');
          locationBtn.removeAttribute('disabled');
        }
      );
    })
    .catch((err) => console.log('could not get location', err));
});