"use client";
import { Card, Table } from "antd";
import CommonLayout from "@/components/layout";
import { dataSource, columns } from "./api";
export default function Resource() {
  return (
    <CommonLayout curActive="/resource">
      <Card>
        <h1>资产管理</h1>
        <Table dataSource={dataSource} columns={columns} />;
      </Card>
    </CommonLayout>
  );
}
