"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Layout,
  Menu,
  Avatar,
  Dropdown,
  ConfigProvider,
  FloatButton,
  Button,
  Drawer,
  Space,
  Form,
  Radio,
  Divider,
  Input,
  ColorPicker,
} from "antd";
import type { MenuProps, ThemeConfig } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import BreadcrumbComponent from "./breadcrumb";
import getNavList from "./menuList";
import { AlgorithmMap, defaultTheme } from "@/utils/themeConfig";
import { useForm } from "antd/es/form/Form";
import styles from "./index.module.css";
const { Header, Content, Footer, Sider } = Layout;
const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a rel="noopener noreferrer" href="#">
        个人中心
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a rel="noopener noreferrer" href="#">
        切换账户
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a rel="noopener noreferrer" href="/login">
        退出登录
      </a>
    ),
  },
];
interface IProps {
  children: React.ReactNode;
  curActive: string;
  defaultOpen?: string[];
}
function CommonLayout({ children, curActive, defaultOpen = ["/"] }: IProps) {
  const router = useRouter();
  const navList = getNavList("zh");
  const handleSelect = (row: { key: string }) => {
    router.push(row.key);
  };

  /*
   * 主题设置
   */
  const [curUseTheme, setCurUseTheme] = useState<ThemeConfig>({
    algorithm: AlgorithmMap[1],
    token: {},
  });
  const [themeForm] = useForm();
  const [open, setOpen] = useState(false);
  const [defaultThemeForm, setDefaultThemeForm] = useState(defaultTheme);
  const [isDark, setIsDark] = useState(false);
  const getThemeBg = (theme = true) => {
    return theme
      ? {
          backgroundColor: "rgba(0, 0, 0, 1)",
          color: "rgba(255, 255, 255, 1)",
        }
      : {
          backgroundColor: "rgba(255, 255, 255, 1)",
          color: "rgba(0, 0, 0, 1)",
        };
  };
  const getCacheTheme = () => {
    const localCache = localStorage.getItem("next-react-admin-theme");
    const theme = localCache ? JSON.parse(localCache) : defaultThemeForm;
    const { algorithm, ...token } = theme;
    setCurUseTheme({
      algorithm: AlgorithmMap[algorithm],
      token,
    });
    setIsDark(algorithm === 2);
  };

  const showDrawer = () => {
    const localCache = localStorage.getItem("next-react-admin-theme");
    const cur = localCache ? JSON.parse(localCache) : defaultThemeForm;
    setDefaultThemeForm(cur);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const resetTheme = () => {
    localStorage.removeItem("next-react-admin-theme");
    const { algorithm, ...token } = defaultTheme;
    setIsDark(false);
    setCurUseTheme({
      algorithm: AlgorithmMap[algorithm],
      token,
    });
    themeForm.resetFields();
    onClose();
  };
  const saveTheme = () => {
    const values = themeForm.getFieldsValue();
    setDefaultThemeForm(values);
    localStorage.setItem("next-react-admin-theme", JSON.stringify(values));
    themeForm.resetFields();
    onClose();
  };

  const onCustomChange = () => {
    const values = themeForm.getFieldsValue();
    const { algorithm, ...token } = values;
    setIsDark(algorithm === 2);
    setCurUseTheme({
      algorithm: AlgorithmMap[algorithm],
      token,
    });
  };
  useEffect(() => {
    getCacheTheme();
  }, []);
  return (
    <ConfigProvider theme={curUseTheme}>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          theme={isDark ? "dark" : "light"}
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {}}
          onCollapse={(collapsed, type) => {}}
        >
          <span
            className={styles.logo}
            style={{
              padding: 0,
              display: "flex",
              color: isDark ? "#fff" : "#000",
            }}
          >
            Next-React-Admin
          </span>
          <Menu
            mode="inline"
            theme={isDark ? "dark" : "light"}
            defaultSelectedKeys={[curActive]}
            items={navList}
            defaultOpenKeys={defaultOpen}
            onSelect={handleSelect}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              display: "flex",
              backgroundColor: isDark ? "#001529" : "#fff",
            }}
          >
            <div className="flex items-center" style={{ paddingLeft: 16 }}>
              <BreadcrumbComponent curActive={curActive} />
            </div>
            <div className={styles.rightControl}>
              <div className={styles.avatar}>
                <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                  <Avatar style={{ ...getThemeBg(!isDark) }}>Admin</Avatar>
                </Dropdown>
              </div>
            </div>
          </Header>
          <Content style={{ margin: "24px 16px 0" }}>
            <div style={{ minHeight: 520 }}>{children}</div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Next-React-Admin ©{new Date().getFullYear()} Created by{" "}
            <a href="https://next-react-admin.vercel.app">yutf</a>
          </Footer>
        </Layout>
      </Layout>
      <FloatButton
        icon={<SettingOutlined />}
        onClick={showDrawer}
      ></FloatButton>
      <Drawer
        title="主题设置"
        width={480}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={resetTheme}>恢复默认</Button>
            <Button type="primary" onClick={saveTheme}>
              保存设置
            </Button>
          </Space>
        }
      >
        <Form
          name="basic"
          form={themeForm}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={defaultThemeForm}
        >
          <Form.Item name="algorithm" label="预设主题样式">
            <Radio.Group onChange={onCustomChange}>
              <Radio value={1}>默认样式</Radio>
              <Radio value={2}>暗黑模式</Radio>
              <Radio value={3}>紧凑模式</Radio>
            </Radio.Group>
          </Form.Item>
          <Divider />
          <h3>自定义主题样式</h3>
          <Form.Item name="colorPrimary" label="主题颜色">
            <ColorPicker onChange={onCustomChange} />
          </Form.Item>
          <Form.Item name="borderRadius" label="基础组件圆角">
            <Input onChange={onCustomChange} />
          </Form.Item>
          <Form.Item name="controlHeight" label="基础组件高度">
            <Input onChange={onCustomChange} />
          </Form.Item>
          <Form.Item name="fontSize" label="字体大小">
            <Input onChange={onCustomChange} />
          </Form.Item>
        </Form>
      </Drawer>
    </ConfigProvider>
  );
}

export default CommonLayout;
