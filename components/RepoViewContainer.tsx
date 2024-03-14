"use client";

import Repo from "@/types/repo";
import { RepoView } from "@/components/RepoView";

export const RepoViewContainer = ({
  data,
  search,
  emptyMessage,
}: {
  data: Repo[];
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
    <div className={"w-full h-full grid grid-cols-3 gap-6 "}>
      {data.map((repo) => (
        <RepoView repo={repo} key={repo.id} search={search} />
      ))}
    </div>
  );
};
