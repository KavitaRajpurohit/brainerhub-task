import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Col, Row, Space, Divider } from "antd";
import Title from "antd/es/typography/Title";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const BASE_URL = "http://localhost:8003";
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    await axios
      .post(`${BASE_URL}/auth/register`, {
        sEmail: values.username,
        sPassword: values.password,
      })
      .then((res) => {
        if (res) {
          toast.success("You are registered. Please login now.");
          navigate("/");
        }
      })
      .catch((err) => {
        console.error(err.response);
        toast.error(err.response.message);
      });
    console.log("Received values of form: ", values);
  };

  return (
    <Row>
      <Col span={4}></Col>
      <Col span={16}>
        <Title>Register</Title>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button mr-2"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col span={4}></Col>
    </Row>
  );
};

export default Register;
