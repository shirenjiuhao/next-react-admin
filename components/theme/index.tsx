"use client";
import React, { useState } from "react";
import {
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
import type { ThemeConfig } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { AlgorithmMap, defaultTheme } from "../theme/themeConfig";
import { useForm } from "antd/es/form/Form";
import ThemeContext from "@/utils/store";

const ThemeConfigLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [curUseTheme, setCurUseTheme] = useState<ThemeConfig>({
    algorithm: AlgorithmMap[1],
    token: {},
  });
  const [themeForm] = useForm();
  const [open, setOpen] = useState(false);
  const [algorithmType, setAlgorithmType] = useState('light');
  const [defaultThemeForm, setDefaultThemeForm] = useState(defaultTheme);
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
    setAlgorithmType('light');
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
    setAlgorithmType(algorithm === 2 ? 'dark': 'light');
    setCurUseTheme({
      algorithm: AlgorithmMap[algorithm],
      token,
    });
  };
  return (
    <ThemeContext.Provider value={algorithmType}>
      <ConfigProvider theme={curUseTheme}>
        {children}
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
    </ThemeContext.Provider>
  );
};
export default ThemeConfigLayout;
