"use client";
import { Tab, Tabs } from "@nextui-org/react";
import React, { Key, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavTab from "@/types/navTab";

export function MainNavbar({ tabs }: { tabs: NavTab[] }) {
  const [selectedTab, setSelectedTab] = useState(undefined);
  const router = useRouter();

  const handleRouting = (key: Key) => {
    // @ts-ignore
    setSelectedTab((prevState) => key);
    console.log(key);
    // @ts-ignore
    router.push(key);
  };

  useEffect(() => {
    const currentUrl = window.location.pathname;
    const selectedTab = tabs.find((tab) => tab.url.endsWith(currentUrl));
    if (selectedTab) {
      // @ts-ignore
      setSelectedTab((prevState) => selectedTab.url);
    }
  }, []);

  return (
    <>
      <Tabs
        aria-label="Dynamic tabs"
        items={tabs}
        variant={"underlined"}
        defaultSelectedKey={window.location.pathname ?? selectedTab ?? ""}
        selectedKey={selectedTab}
        onSelectionChange={handleRouting}
        className={""}
      >
        {(item: any) => <Tab key={item.url} title={item.label}></Tab>}
      </Tabs>
    </>
  );
}
