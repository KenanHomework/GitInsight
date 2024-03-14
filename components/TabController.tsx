import { Tab, Tabs } from "@nextui-org/react";
import TabFactoryItem from "@/types/tab";

export const TabController = ({ tabs }: { tabs: TabFactoryItem[] }) => {
  return (
    <>
      <Tabs aria-label="Dynamic tabs" items={tabs} variant={"underlined"}>
        {(item: TabFactoryItem) => (
          <Tab key={item.id} title={item.label}>
            <item.content />
          </Tab>
        )}
      </Tabs>
    </>
  );
};
