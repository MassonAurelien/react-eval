import Link from "next/link";
import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Col, Row, Layout } from "antd";

function Navbar({user}) {
  const { Header } = Layout;

  return (
    <Header>
      <Row justify="space-between" style={{ color: "white" }}>
        <Col>
          <Link href="/sports">
            <span style={{ color: "white" }}>Sports</span>
          </Link>
        </Col>
        <Col>
          <Link href="/dashboard">
            {user ? `Hello ${user.firstName}`: <UserOutlined />}
          </Link>
        </Col>
      </Row>
    </Header>
  );
}

export default Navbar;
