import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "VOTRE_API_KEY",
  authDomain: "votre-app.firebaseapp.com",
  projectId: "votre-app",
  storageBucket: "votre-app.appspot.com",
  messagingSenderId: "ID_ENVOI",
  appId: "ID_APP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'members'));
      setMembers(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchData();
  }, []);

  const addMember = async () => {
    if (newMember) {
      await addDoc(collection(db, 'members'), { name: newMember });
      setNewMember('');
      const querySnapshot = await getDocs(collection(db, 'members'));
      setMembers(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
  };

  return (
    <div>
      <h1>Liste des membres</h1>
      <ul>
        {members.map((member) => (
          <li key={member.id}>{member.name}</li>
        ))}
      </ul>
      <input value={newMember} onChange={(e) => setNewMember(e.target.value)} />
      <button onClick={addMember}>Ajouter</button>
    </div>
  );
}

export default App;
