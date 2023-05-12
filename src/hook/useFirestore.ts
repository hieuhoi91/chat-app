import { useEffect, useState } from 'react';
import {
  query,
  where,
  orderBy,
  collection,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { IDocument } from '../types';

const useFirestore = (collectionName: any, condition: any) => {
  const [documents, setDocuments] = useState<IDocument[]>([]);

  useEffect(() => {
    let collectionRef = collection(db, collectionName);

    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        return;
      }

      query(
        collectionRef,
        where(condition.fieldName, condition.operator, condition.compareValue),
        orderBy('createdAt', 'desc')
      );
    }

    const q = query(
      collectionRef,
      where(condition.fieldName, condition.operator, condition.compareValue)
    );

    const unsubscribe = onSnapshot(q, snapshot => {
      const documents = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      setDocuments(documents);
    });

    return unsubscribe;
  }, [collectionName, condition]);

  return documents;
};

export default useFirestore;
