import { CommitView } from "@/components/CommitView";

export const CommitViewContainer = ({
  data,
  search,
  emptyMessage,
}: {
  data: any[];
  search: string;
  emptyMessage: {
    title: string;
    description: string;
  };
}) => {
  if (data.length === 0) {
    return (
      <div
        className={
          "w-full h-full flex flex-col gap-2 justify-center items-center"
        }
      >
        <h1 className={"font-semibold"}>
          {search ? "No Results Found" : emptyMessage?.title}
        </h1>
        <p className={"text-second text-sm"}>
          {search
            ? "Your search did not return any results."
            : emptyMessage?.description}
        </p>
      </div>
    );
  }
  return (
    <div className={"w-full flex flex-col gap-2"}>
      {data.map((commit) => (
        <CommitView commit={commit} key={commit.sha} search={search} />
      ))}
    </div>
  );
};
