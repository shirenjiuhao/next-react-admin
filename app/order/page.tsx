"use client";
import { Card, Table } from "antd";
import CommonLayout from "@/components/layout";
import { dataSource, columns } from "./api";
export default function Order() {
  return (
    <CommonLayout curActive="/order">
      <Card>
        <h1>订单管理</h1>
        <Table dataSource={dataSource} columns={columns} />;
      </Card>
    </CommonLayout>
  );
}
