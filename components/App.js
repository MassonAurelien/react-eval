import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebase";
import React, { useEffect, useState } from "react";

const firebaseApp = initializeApp(firebaseConfig);

const App = ({ title }) => {
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  const [user, setUser] = useState({});
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docSnap = await getDoc(doc(db, "users", user.uid));

        if (docSnap.exists()) {
          setUser(docSnap.data());
        }
      }
    });
    return () => setUser({});
  }, []);

  return <div>Page ACCUEIL</div>;
};

export default App;
