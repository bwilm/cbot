const socket = io('http://localhost:3000');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const conversationbox = document.querySelector('.convo-box');
const cancelButton = document.getElementById('cancel-button');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');

document.addEventListener('DOMContentLoaded', () => {
    this.getTime();
})

const name = prompt('What is your name');
appendMessage('You joined')
socket.emit('new-user', name)

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`);
});
socket.on('user-connected', name => {
    appendMessage(`${name} connected`); 
});
socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`); 
});

cancelButton.addEventListener('click', function(event){
    event.preventDefault();
    messageInput.value = '';
});



messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message);
    messageInput.value = '';
})

function appendMessage(message){
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.className = 'message';
    conversationbox.append(messageElement);
}


function getTime(){
setInterval(function(){
let cTime = new Date();
let cHour = cTime.getHours();
let cSeconds = cTime.getSeconds();
let cMinutes = cTime.getMinutes(); 

cHour >= 13 ? cHour = cHour - 12: cHour = cHour;
cMinutes < 10 ? cMinutes = `0${cMinutes}`: cMinutes = cMinutes;
cSeconds < 10 ? cSeconds = `0${cSeconds}`: cSeconds = cSeconds;
hours.innerHTML = cHour.toLocaleString();
minutes.innerHTML = cMinutes;
seconds.innerHTML = cSeconds.toLocaleString();

 }, 1000)
}