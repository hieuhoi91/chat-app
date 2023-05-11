import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

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
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

connectAuthEmulator(auth, 'http://localhost:9099');
if (window.location.hostname === 'localhost') {
  connectFirestoreEmulator(db, 'localhost', 8080);
}

export { auth, db };
