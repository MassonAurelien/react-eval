import Link from "next/link";
import React, { useState } from "react";
import {
  Layout,
  Row,
  Col,
  Form,
  Input,
  Button,
  Typography,
  message,
} from "antd";

import {
  MailOutlined,
  LockOutlined,
  LoadingOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../config/firebase";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, serverTimestamp, setDoc, doc } from "firebase/firestore";
import Router from "next/router";

const firebaseApp = initializeApp(firebaseConfig);

const Signup = () => {
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  const [state, setState] = useState({});
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, state.email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        // Penser à import setDoc, Doc
        await setDoc(doc(db, "users", user.uid), {
          ...state,
          createdAt: serverTimestamp(),
        });

        setLoading(false);
        message.success("Vous êtes bien inscrit");
        Router.push("/dashboard");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.code, error.message);
        message.error("ERREUR : " + error.message);
      });
  };

  const { Content } = Layout;
  const { Title } = Typography;

  return (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
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
                Inscription
              </Title>

              <Form onFinish={handleSubmit} className="login-form">
                <Form.Item name="Votre Prénom" rules={[{ required: true }]}>
                  <Input
                    prefix={<UserOutlined />}
                    type="text"
                    size="large"
                    name="firstName"
                    placeholder=" Votre Prénom"
                    onChange={(e) =>
                      setState({ ...state, [e.target.name]: e.target.value })
                    }
                  />
                </Form.Item>

                <Form.Item name="Votre Nom" rules={[{ required: true }]}>
                  <Input
                    prefix={<UserOutlined />}
                    type="text"
                    size="large"
                    name="name"
                    placeholder="Votre Nom"
                    onChange={(e) =>
                      setState({ ...state, [e.target.name]: e.target.value })
                    }
                  />
                </Form.Item>

                <Form.Item name="Votre Email" rules={[{ required: true }]}>
                  <Input
                    prefix={<MailOutlined />}
                    type="email"
                    size="large"
                    placeholder=" Votre Email"
                    name="email"
                    onChange={(e) =>
                      setState({ ...state, [e.target.name]: e.target.value })
                    }
                  />
                </Form.Item>
                <Form.Item
                  name="Votre Mot de passe"
                  rules={[{ required: true }]}
                >
                  <Input
                    prefix={<LockOutlined />}
                    size="large"
                    type="password"
                    placeholder=" Votre Mot de passe"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    shape="round"
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    {loading ? <LoadingOutlined /> : null}
                    Confirmer
                  </Button>
                </Form.Item>
              </Form>
            </Typography>

            <Typography
              style={{
                textAlign: "center",
              }}
            >
              <Title level={4} style={{ fontWeight: 500, fontSize: 18 }}>
                Déjà sur Recipes ?
              </Title>
              <Link href="/login">Connexion</Link>
            </Typography>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Signup;
