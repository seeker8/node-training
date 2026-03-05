const socket = io();

socket.on('message', (message) => {
  console.log(message);
});

const sendMessageForm = document.getElementById('message-form');

sendMessageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(sendMessageForm).entries());
  socket.emit('sendMessage', formData.message);
})