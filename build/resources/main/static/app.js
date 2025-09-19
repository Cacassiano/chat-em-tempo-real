const stompClient = new StompJs.Client({
    brokerURL: 'ws://localhost:8080/gs-guide-websocket'
});

stompClient.onConnect = (frame) => {
    console.log('Connected: ' + frame);
    stompClient.subscribe('/topic/greetings', (greeting) => {
        showGreeting(JSON.parse(greeting.body).content);
    });
    console.log('Sending message: ', JSON.stringify({'name': "Sistema", 'message': "Novo usuário conectado"}));
    stompClient.publish({
        destination: "/app/hello",
        body: JSON.stringify({'name': "Sistema", 'message': "Novo usuário conectado"})
    });
};

stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};

stompClient.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};

function connect() {
    stompClient.activate();
}

function disconnect() {
    stompClient.deactivate();
    console.log("Disconnected");
}

function sendMessage() {
    console.log('Sending message: ', JSON.stringify({'name': $("#name").val(), 'message': $("#message").val()}));
    stompClient.publish({
        destination: "/app/hello",
        body: JSON.stringify({'name': $("#name").val(), 'message': $("#message").val()})
    });
}

function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $( "#connect" ).click(() => connect());
    $( "#disconnect" ).click(() => disconnect());
    $( "#send" ).click(() => sendMessage());
});

addEventListener("DOMContentLoaded", (e) => {
    connect();
})