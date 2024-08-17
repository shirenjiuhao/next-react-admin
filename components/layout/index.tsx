"use client";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { Layout, Menu, Avatar, Dropdown, type MenuProps } from "antd";
import getNavList from "./menuList";
import ThemeConfig from "../theme";
import { getThemeBg } from "@/utils";
import styles from "./index.module.css";
import ThemeContext from "@/utils/store";
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
  //   const pathname = usePathname();
  const navList = getNavList("zh");
  const handleSelect = (row: { key: string }) => {
    router.push(row.key);
  };
  const algorithmType = useContext(ThemeContext)
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    console.log(algorithmType)
    setIsDark(algorithmType === 'dark')
  }, [algorithmType])
  return (
    <ThemeConfig>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          theme={isDark ? 'dark' : 'light'}
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {}}
          onCollapse={(collapsed, type) => {}}
        >
          <span className={styles.logo} style={{ padding: 0, display: "flex", ...getThemeBg(isDark) }}>Next-React-Admin</span>
          <Menu
            mode="inline"
            theme={isDark ? 'dark' : 'light'}
            defaultSelectedKeys={[curActive]}
            items={navList}
            defaultOpenKeys={defaultOpen}
            onSelect={handleSelect}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, display: "flex", ...getThemeBg(isDark) }}>
            <div className={styles.rightControl}>
              <div className={styles.avatar}>
                <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                  <Avatar style={{ ...getThemeBg(!isDark) }}>
                    Admin
                  </Avatar>
                </Dropdown>
              </div>
            </div>
          </Header>
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              style={{
                padding: 24,
                minHeight: 520,
              }}
            >
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Next-React-Admin ©{new Date().getFullYear()} Created by{" "}
            <a href="https://next-react-admin.vercel.app">yutf</a>
          </Footer>
        </Layout>
      </Layout>
    </ThemeConfig>
  );
}

export default CommonLayout;
