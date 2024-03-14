"use client";
import { useEffect, useState } from "react";
import { Input } from "@nextui-org/input";
import { IoIosSearch } from "react-icons/io";
import { RepoViewContainer } from "@/components/RepoViewContainer";
import { useAuthData } from "@/utils/auth";
import Repo from "@/types/repo";
import { Loader } from "@/components/Loader/Loader";
import PaginationMeta from "@/types/paginationMeta";
import { Pagination } from "@nextui-org/react";
import { getPaginatedData } from "@/utils/common";
import { getUserSavedRepos } from "@/actions/home";
import Head from "next/head";

export function ReposPage() {
  const { login } = useAuthData();

  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [filteredRepos, setFilteredRepos] = useState<Repo[] | null>(null);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    async function getAllRepos() {
      const savedRepos =
        (await getUserSavedRepos(login))?.map((repo) => repo.id) ?? [];

      const res = await getPaginatedData(`/users/${login}/repos?sort=updated`);

      const data = res.map((repo) => ({
        ...repo,
        isSaved: savedRepos.includes(repo.id),
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
        placeholder="Search Repositories"
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
            title: "No Repositories Found",
            description:
              "It seems like this user doesn't have any repositories yet.",
          }}
        />
      ) : (
        <Loader />
      )}
    </>
  );
}
