"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Flex, Button, Form, Input, Checkbox, Card } from "antd";
import type { FormProps } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { loginApi, registerApi } from "./api";
type FieldType = {
  username: string;
  password: string;
  remember?: string;
};
export default function Login() {
  const [curMode, setCurMode] = useState(1);
  const [form] = Form.useForm();
  const router = useRouter();
  const modeChange = (value: number) => {
    setCurMode(value);
    form.resetFields();
  };
  const onFinish: FormProps<FieldType>["onFinish"] = (values: FieldType) => {
    const { username, password } = values;
    if (curMode === 1) {
      loginApi(username, password).then((res) => {
        // login logic
        router.push("/dashboard");
      });
      return;
    }
    registerApi(username, password).then((res) => {
      // register logic
      router.push("/dashboard");
    });
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card style={{ width: 300 }}>
        <Flex className="justify-center" style={{ marginBottom: 16 }}>
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            className="dark:invert"
            width={100}
            height={24}
            priority
          />
          <span style={{ marginLeft: 10 }}>中后台管理</span>
        </Flex>
        <Form
          name="basic"
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 420 }}
          form={form}
          onFinish={onFinish}
          autoComplete="off"
        >
          {curMode === 1 ? (
            <>
              <Form.Item<FieldType>
                name="username"
                rules={[
                  {
                    required: true,
                    message: "请输入用户名",
                  },
                ]}
              >
                <Input
                  placeholder="用户名"
                  size="large"
                  variant="filled"
                  prefix={<UserOutlined />}
                />
              </Form.Item>

              <Form.Item<FieldType>
                name="password"
                rules={[{ required: true, message: "请输入密码" }]}
              >
                <Input.Password
                  size="large"
                  placeholder="请输入密码"
                  variant="filled"
                  prefix={<LockOutlined />}
                />
              </Form.Item>
              <Form.Item<FieldType> name="remember">
                <div>
                  <Checkbox>记住密码</Checkbox>
                  <Button
                    type="link"
                    style={{ marginLeft: 100 }}
                    onClick={() => modeChange(2)}
                  >
                    注册
                  </Button>
                </div>
              </Form.Item>
              <Form.Item wrapperCol={{ span: 24 }}>
                <Button type="primary" htmlType="submit" block size="large">
                  登录
                </Button>
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item<FieldType>
                name="username"
                rules={[
                  {
                    required: true,
                    message: "请输入用户名",
                  },
                ]}
              >
                <Input
                  placeholder="请输入用户名"
                  size="large"
                  variant="filled"
                  prefix={<UserOutlined />}
                />
              </Form.Item>

              <Form.Item<FieldType>
                name="password"
                rules={[{ required: true, message: "请输入密码" }]}
              >
                <Input.Password
                  size="large"
                  placeholder="请输入密码"
                  variant="filled"
                  prefix={<LockOutlined />}
                />
              </Form.Item>
              <Form.Item<FieldType> name="remember">
                <Button type="link" onClick={() => modeChange(1)}>
                  已有账号去登录
                </Button>
              </Form.Item>
              <Form.Item wrapperCol={{ span: 24 }}>
                <Button type="primary" htmlType="submit" block size="large">
                  注册
                </Button>
              </Form.Item>
            </>
          )}
        </Form>
      </Card>
    </main>
  );
}
