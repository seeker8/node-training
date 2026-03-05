const socket = io();
let count = 0;

socket.on('countUpdated', (newCount) => {
  console.log('count has been updated', count);
  count = newCount;
});

const incrementBtn = document.getElementById('increment');
incrementBtn.addEventListener('click', (e) => {
  console.log('clicked', count);
  socket.emit('increment');
});