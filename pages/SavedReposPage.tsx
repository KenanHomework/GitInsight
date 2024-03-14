"use client";
import { useEffect, useState } from "react";
import { Input } from "@nextui-org/input";
import { IoIosSearch } from "react-icons/io";
import { RepoViewContainer } from "@/components/RepoViewContainer";
import { useAuthData } from "@/utils/auth";
import Repo from "@/types/repo";
import { Loader } from "@/components/Loader/Loader";
import { getUserSavedRepos } from "@/actions/home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Repos - Git Insight",
};

export default function SavedReposPage() {
  const { login } = useAuthData();

  const [repos, setRepos] = useState<Repo[] | undefined>(undefined);
  const [filteredRepos, setFilteredRepos] = useState<Repo[] | undefined>(
    undefined
  );
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    async function getAllRepos() {
      const res = (await getUserSavedRepos(login)) ?? [];

      const data = res.map((repo) => ({
        ...repo,
        isSaved: true,
      }));

      setRepos(data);
      setFilteredRepos(data);
    }
    getAllRepos();
  }, []);

  useEffect(() => {
    const filteredRepos = searchValue
      ? repos!.filter((repo) =>
          repo.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      : repos;

    setFilteredRepos(filteredRepos);
  }, [searchValue]);

  return (
    <>
      <Input
        className={"!bg-primary sticky top-[109px] z-10"}
        placeholder="Search Favorite Repositories"
        size={"sm"}
        startContent={
          <IoIosSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        onValueChange={setSearchValue}
      />

      {repos ? (
        <RepoViewContainer
          data={filteredRepos!}
          search={searchValue}
          emptyMessage={{
            title: "No Saved Repositories",
            description: "You have not saved any repositories yet.",
          }}
        />
      ) : (
        <Loader />
      )}
    </>
  );
}
