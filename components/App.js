import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebase";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Layout } from "antd";
import ListSports from "./Sports/ListSports";


const firebaseApp = initializeApp(firebaseConfig);

const App = () => {
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  const [user, setUser] = useState({});
  const [sports, setSports] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
          const result = await axios('https://www.thesportsdb.com/api/v1/json/2/all_sports.php',);
          setSports(result.data);
      };
      fetchData();
      }, []);

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
        <ListSports data={sports}/>
      </Content>
    </Layout>
  );
}

export default App;
