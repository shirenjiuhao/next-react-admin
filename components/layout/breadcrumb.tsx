import { Breadcrumb } from "antd";
import type { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import getNavList from "./menuList";
import { AnyObject } from "antd/es/_util/type";

const items: ItemType[] = getNavList("zh").map((item) => {
  let children: ItemType[] = [];
  if (item.children) {
    children = item.children.map((child) => {
      return {
        path: child.key,
        title: child.label,
      };
    });
  }
  return {
    path: item.key,
    title: item.label,
    children: children.length ? children : undefined,
  };
});
function itemRender(currentRoute:ItemType, params:AnyObject, items:ItemType[], paths:string[]) {
    const isLast = currentRoute?.path === items[items.length - 1]?.path;
  
    return isLast ? (
      <span>{currentRoute.title}</span>
    ) : (
      <a href={`/${paths.join("/")}`}>{currentRoute.title}</a>
    );
  }
export default function BreadcrumbComponent({
  curActive,
}: {
  curActive: string;
}) {
  const curBreadcrumb = items.filter((item) => item.path === curActive);
  curBreadcrumb.unshift({ title: "首页", path: "/dashboard" });
  return <Breadcrumb itemRender={itemRender} items={curBreadcrumb} />;
}
