import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import Navbar from "./Navbar";

import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "../config/firebase";

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists()) {
          setUser({...docSnap.data(), id : user.uid});
        } // else message.warning("User not found");
      }
    });
    return () => setUser({});
  }, []);

  const { Content } = Layout;
  return (
    <Layout>
      <Navbar user={user} />
      <Content>
        <div>CONTENT SPORTS</div>
      </Content>
    </Layout>
  );
};

export default App;
