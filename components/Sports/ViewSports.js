import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../config/firebase";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { Layout } from "antd";
import ListSports from "./ListSports";
import axios from "axios";


const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const ViewSports = () => {
  const [user, setUser] = useState({});
  const [sports, setSports] = useState([]);
  const [sportsFav, setSportsFav] = useState([]);

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
          setUser({...docSnap.data(), id : user.uid});
        }
      }
    });
    return () => setUser({});
  }, []);

  useEffect(() => {
    if (user?.favoritesSports)
      sports.sports.map((sport) => {
        if (user.favoritesSports && user.favoritesSports.includes(String(sport.idSport))) {
          setSportsFav((sportsFav) => [...sportsFav, { ...sport, favorite: true }]);
        } else
          setSportsFav((sportsFav) => [...sportsFav, { ...sport, favorite: false }]);
      });
  }, [user]);

  console.log(user);
  const { Content } = Layout;
  return (
    <Layout>
      <Navbar user={user} />
      <Content>
        <ListSports data={sportsFav?.length > 0 ? sportsFav : sports.sports} userId={user?.id}/>
      </Content>
    </Layout>
  );
}

export default ViewSports;
