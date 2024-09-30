// Import Firebase functions (for modular Firebase)
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onChildAdded } from "firebase/database";  // Import required database functions

// Your web app's Firebase configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyDN4HFaWqmQLkL6MgZjiE1ej3VL_q1sFkA",
  authDomain: "cs1908.firebaseapp.com",
  databaseURL: "https://cs1908-default-rtdb.firebaseio.com",
  projectId: "cs1908",
  storageBucket: "cs1908.appspot.com",
  messagingSenderId: "90450004422",
  appId: "1:90450004422:web:c5bf82ae85d6de9f290ac7",
  measurementId: "G-76PDRCHJ5L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const database = getDatabase(app);

// DOM elements
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

// Function to append messages to the chatbox
function appendMessage(message, userType) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', userType);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom
}

// Send message to Firebase Realtime Database
sendBtn.addEventListener('click', function() {
    const message = messageInput.value.trim();
    if (message) {
        const messageObj = {
            text: message,
            timestamp: Date.now()
        };
        // Push the message to Firebase database
        push(ref(database, 'messages'), messageObj);
        messageInput.value = '';  // Clear input box
    }
});

// Listen for new messages from Firebase
onChildAdded(ref(database, 'messages'), (snapshot) => {
    const messageData = snapshot.val();
    const userType = messageData.timestamp === Date.now() ? 'user' : 'sender';  // Differentiate between user and sender
    appendMessage(messageData.text, userType);
});
