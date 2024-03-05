import { Sidebar } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import type { TNav } from "../types";
import { nav } from "./nav";

const SidebarComponent: FC = function () {
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    const newPage = window.location.pathname;

    setCurrentPage(newPage);
  }, [setCurrentPage]);

  const renderMenuContent = (v: TNav) => {
    if (v.hidden) return null;
    else if (v.type === "collapse") {
      const isActive = (v.children ?? []).find((v) => v.key === currentPage);
      return (
        <Sidebar.Collapse
          key={v.name}
          icon={v.icon}
          label={v.name}
          open={!!isActive}
          className={isActive ? "bg-gray-100 dark:bg-gray-700" : ""}
        >
          {(v.children ?? []).map(renderMenuContent)}
        </Sidebar.Collapse>
      );
    }
    return (
      <Sidebar.Item
        key={v.key}
        href={v.key}
        icon={v.icon}
        className={v.key === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""}
      >
        {v.name}
      </Sidebar.Item>
    );
  };

  const renderMenu = () => {
    return nav.map(renderMenuContent);
  };

  return (
    <Sidebar>
      <div className="flex h-full flex-col justify-between py-2">
        <Sidebar.Items>
          <Sidebar.ItemGroup>{renderMenu()}</Sidebar.ItemGroup>
        </Sidebar.Items>
      </div>
    </Sidebar>
  );
};

export default SidebarComponent;
