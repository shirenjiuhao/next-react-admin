import {
  FundOutlined,
  LayoutOutlined,
  BarChartOutlined,
  DesktopOutlined,
  ScheduleOutlined,
  CalculatorOutlined,
  UserOutlined,
  WalletOutlined,
  BuildOutlined,
  OpenAIOutlined,
  PartitionOutlined,
  FileExcelOutlined,
  PieChartOutlined,
  FileMarkdownOutlined,
} from "@ant-design/icons";
import React from "react";

const getNavList = (t: any) => {
  return [
    {
      key: "/",
      icon: <DesktopOutlined />,
      label: "数据大盘",
      children: [
        {
          key: "/dashboard",
          icon: <BarChartOutlined />,
          label: "自定义报表",
        },
        // {
        //   key: "/dashboard/monitor",
        //   icon: <FundOutlined />,
        //   label: "数据监控",
        // },
        // {
        //   key: "/dashboard/chart",
        //   icon: <PieChartOutlined />,
        //   label: "流程图编辑器",
        // },
        // {
        //   key: "/dashboard/rpa",
        //   icon: <PartitionOutlined />,
        //   label: "可视化流程编排",
        // },
      ],
    },
    {
      key: "/user",
      icon: <UserOutlined />,
      label: "用户管理",
    },
    // {
    //   key: "/agents",
    //   icon: <OpenAIOutlined />,
    //   label: "AI智能问答",
    // },
    // {
    //   key: "/excel",
    //   icon: <FileExcelOutlined />,
    //   label: "电子表格",
    // },
    // {
    //   key: "/md",
    //   icon: <FileMarkdownOutlined />,
    //   label: "MD编辑器",
    // },
    // {
    //   key: "/formEngine",
    //   icon: <CalculatorOutlined />,
    //   label: "表单引擎",
    // },
    // {
    //   key: "/dragMode",
    //   icon: <BuildOutlined />,
    //   label: "拖拽搭建",
    // },
    // {
    //   key: "/board",
    //   icon: <LayoutOutlined />,
    //   label: "办公白板",
    // },
    {
      key: "/order",
      icon: <ScheduleOutlined />,
      label: "订单列表",
    },
    {
      key: "/resource",
      icon: <WalletOutlined />,
      label: "资产管理",
    },
  ];
};

export default getNavList;
