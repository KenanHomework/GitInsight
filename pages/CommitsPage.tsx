"use client";

import { useAuthData } from "@/utils/auth";
import { useEffect, useState } from "react";
import { getPaginatedData } from "@/utils/common";
import { Input } from "@nextui-org/input";
import { IoIosSearch } from "react-icons/io";
import { Loader } from "@/components/Loader/Loader";
import { CommitViewContainer } from "@/components/CommitViewContainer";

export const CommitsPage = ({ repo }: { repo: string }) => {
  const { login } = useAuthData();
  const [commits, setCommits] = useState<any>(null);
  const [filteredCommits, setFilteredCommits] = useState<any>(null);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    async function getAllCommits() {
      const res = await getPaginatedData(`/repos/${login}/${repo}/commits`);

      setCommits(res);
      setFilteredCommits(res);
    }

    getAllCommits();
  }, []);

  useEffect(() => {
    const filteredRepos = searchValue
      ? commits!.filter((commit: any) =>
          commit.commit.message
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        )
      : commits;

    setFilteredCommits(filteredRepos);
  }, [searchValue]);

  return (
    <>
      <Input
        className={"!bg-primary sticky top-[109px] z-10"}
        placeholder="Search Commits"
        size={"sm"}
        startContent={
          <IoIosSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        onValueChange={setSearchValue}
      />

      {commits ? (
        <CommitViewContainer
          data={filteredCommits}
          search={searchValue}
          emptyMessage={{
            title: "No Commits Found",
            description:
              "It seems like this repository doesn't have any commit yet.",
          }}
        />
      ) : (
        <Loader />
      )}
    </>
  );
};
