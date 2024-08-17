"use client";
import { HolderOutlined } from "@ant-design/icons";
import CommonLayout from "@/components/layout";
import Chart from "@/components/Chart";
import boardList from "./board";
import styles from "./index.module.css";
export default function Dashboard() {
  return (
    <CommonLayout curActive="/dashboard">
      <main className={styles.dashboardWrap}>
        <div className={styles.content} id="dashboard">
          {boardList.map((v, i) => {
            return (
              <div
                key={i}
                style={{ width: v.w, height: v.h }}
                className={styles.card}
              >
                <span className="moveBtn">
                  <HolderOutlined />
                </span>
                <Chart data={v.data} type={v.type} id={v.id} />
              </div>
            );
          })}
        </div>
      </main>
    </CommonLayout>
  );
}
