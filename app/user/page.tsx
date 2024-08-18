"use client";
import { Card, Table } from "antd";
import CommonLayout from "@/components/layout";
import { dataSource, columns } from "./api";
export default function User() {
  return (
    <CommonLayout curActive="/user">
      <Card>
        <h1>用户管理</h1>
        <Table dataSource={dataSource} columns={columns} />;
      </Card>
    </CommonLayout>
  );
}
