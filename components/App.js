import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebase";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Layout } from "antd";


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

  const { Content } = Layout;
  return (
    <Layout>
      <Navbar user={user} />
      <Content>
        <div>WELCOME !</div>
      </Content>
    </Layout>
  );
}

export default App;
