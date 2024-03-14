import { Card } from "@nextui-org/card";
import { calculateTimeAgo } from "@/utils/common";
import { LuGitBranch } from "react-icons/lu";
import React from "react";

export const CommitView = ({
  commit,
  search = "",
  ...props
}: {
  commit: any;
  search: string | undefined;
}) => {
  const highlightedMessage = commit.commit.message.replace(
    new RegExp(search.length > 0 ? search : "  ", "gi"),
    (match: string) => `<h1 class="highlighted-text-search">${match}</h1>`
  );

  return (
    <Card
      onClick={() => {
        window.open(commit.html_url, "_blank");
      }}
      isPressable={true}
      className={
        "w-full bg-primary py-5 pl-4 pr-6 border border-[#252525] smooth-animation rounded-lg gap-2 grid grid-cols-[30px,1fr,80px,1fr] items-center"
      }
      disableRipple={true}
      {...props}
    >
      <LuGitBranch size={16} />
      <p
        className={"font-semibold ellipsis-overflow flex"}
        dangerouslySetInnerHTML={{ __html: highlightedMessage }}
      />

      <p className={"text-sm text-second"}>{commit.sha.slice(0, 7)}</p>

      <p className={"justify-self-end"}>
        {calculateTimeAgo(commit.commit.committer.date)}
      </p>
    </Card>
  );
};
