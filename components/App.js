import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebase";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Layout, Row, Col, Typography } from "antd";


const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const App = () => {
  const [user, setUser] = useState({});
  
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

  const { Content } = Layout;
  const { Title } = Typography;
  return (
    <Layout>
      <Navbar user={user} />
      <Content>
        <Row>
          <Col
            xs={{ span: 20, offset: 2 }}
            md={{ span: 12, offset: 6 }}
            lg={{ span: 8, offset: 8 }}
          >
            <Typography
              style={{
                borderRadius: 8,
                marginTop: "6vh",
                marginBottom: 64,
                textAlign: "center",
              }}
            >
              <Title level={1} style={{ fontSize: 32, marginBottom: 32 }}>
                Bienvenue sur le site Web React de François et Aurélien !
              </Title>
            </Typography>
            </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default App;
