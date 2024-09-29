// Firebase configuration (replace with your actual config)
var firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

// DOM elements
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

// Function to append messages to chatbox
function appendMessage(message, userType) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', userType);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom
}

// Send message to Firebase
sendBtn.addEventListener('click', function() {
    const message = messageInput.value.trim();
    if (message) {
        const messageObj = {
            text: message,
            timestamp: Date.now()
        };
        database.ref('messages').push(messageObj);  // Push message to Firebase
        messageInput.value = '';  // Clear input box
    }
});

// Listen for new messages from Firebase
database.ref('messages').on('child_added', function(snapshot) {
    const messageData = snapshot.val();
    const userType = messageData.timestamp === Date.now() ? 'user' : 'sender';  // Differentiate between user and sender
    appendMessage(messageData.text, userType);
});
