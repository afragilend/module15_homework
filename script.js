var socket;

function init() {
    socket = new WebSocket('wss://echo-ws-service.herokuapp.com');

    socket.onopen = function(event) {
        console.log('WebSocket connection established.');
    };

    socket.onmessage = function(event) {
        var message = event.data;
        addMessageToChat(message);
    };

    socket.onclose = function(event) {
        console.log('WebSocket connection closed.');
    };
}

function sendMessage() {
    var messageInput = document.getElementById('messageInput');
    var message = messageInput.value;

    if (message !== '') {
        addMessageToChat(message);
        socket.send(message);
        messageInput.value = '';
    }
}

function sendLocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            var locationUrl = 'https://www.openstreetmap.org/?mlat=' + latitude + '&mlon=' + longitude + '#map=15/' + latitude + '/' + longitude;
            addMessageToChat('Моя геолокация: <a href="' + locationUrl + '" target="_blank">' + locationUrl + '</a>');

            socket.send('Моя геолокация: ' + locationUrl);
        });
    } else {
        console.log('Geolocation is not supported by your browser.');
    }
}

function addMessageToChat(message) {
    var chatWindow = document.getElementById('chatWindow');
    var messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    chatWindow.appendChild(messageElement);
}
