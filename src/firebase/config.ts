import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBmM-YE0lVrJUfEOe1jzj6CtOmReoUuqk8',
  authDomain: 'chat-app-176d7.firebaseapp.com',
  projectId: 'chat-app-176d7',
  storageBucket: 'chat-app-176d7.appspot.com',
  messagingSenderId: '204635967091',
  appId: '1:204635967091:web:9e8bcccd7d718fc940e406',
  measurementId: 'G-9HZMXLVVM0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
