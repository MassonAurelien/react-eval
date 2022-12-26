import Link from "next/link";
import Router from "next/router";
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

import { MailOutlined, LockOutlined, LoadingOutlined } from "@ant-design/icons";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../config/firebase";

const firebaseApp = initializeApp(firebaseConfig);

const Login = () => {
  const auth = getAuth(firebaseApp);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        message.success("vous êtes reconnu");
        Router.push("/dashboard");
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        message.error("Vous n'êtes pas reconnu !");
        setLoading(false);
      });
  };

  const onMailChange = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
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
                Connexion
              </Title>

              <Form onFinish={handleSubmit} className="login-form">
                <Form.Item name="Votre Email" rules={[{ required: true }]}>
                  <Input
                    prefix={<MailOutlined />}
                    type="email"
                    size="large"
                    placeholder=" Votre Email"
                    onChange={onMailChange}
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
                    onChange={onPasswordChange}
                  />
                </Form.Item>

                <Button
                  type="link"
                  style={{
                    fontSize: 11,
                    position: "relative",
                    top: -25,
                    right: -105,
                  }}
                  className="login-form-forgot"
                >
                  Mot de passe oublié ?
                </Button>

                <Form.Item>
                  <Button
                    shape="round"
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    {loading ? <LoadingOutlined /> : null}
                    Connexion
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
                Nouveau sur Recipes ?
              </Title>
              <Link href="/signup">Inscription</Link>
            </Typography>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Login;
