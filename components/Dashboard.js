import React, { useEffect, useState } from "react";
import Router from "next/router";
import { Button, Layout, message, Typography } from "antd";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Navbar from "./Navbar";

const firebaseApp = initializeApp(firebaseConfig);

const Dashboard = () => {
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  const [state, setState] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;

        const docSnap = await getDoc(doc(db, "users", uid));

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setState(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } else {
        Router.push("/login");
      }
    });
    return () => setState({});
  }, []);

  const logout = async () => {
    signOut(auth)
      .then(() => {
        message.info("Vous êtes bien déconnecté");
      })
      .catch((err) => {
        message.error("Une erreur s'est produite : " + err.message);
      });
  };
  
  const { Content } = Layout;
  return (
    <Layout>
      <Navbar />
      <Content>
        <Typography.Title level={4}>
          Bienvenue {state.firstName}
        </Typography.Title>
        <Button onClick={logout}>Déconnexion</Button>
      </Content>
    </Layout>
  );
};

export default Dashboard;
