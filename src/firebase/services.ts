import { addDoc } from 'firebase/firestore';
import { db } from './config';
import firebase from 'firebase/compat/app';

export const addDocument = async (collection: any, data: any) => {
  const query = await collection(db, 'users');

  const docRef = await addDoc(query, {
    ...data,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};
