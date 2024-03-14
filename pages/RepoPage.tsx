"use client";
import { ProgressBarChart } from "@/components/ProgressBarChart";
import { useAuthData } from "@/utils/auth";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/react";
import { Card } from "@nextui-org/card";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { getUserSavedRepos, toggleRepoForUser } from "@/actions/home";
import { RepoInfoView } from "@/components/RepoInfoView";
import { calculateTimeAgo } from "@/utils/common";
import { LuGitBranch, LuGitCommit } from "react-icons/lu";

export const RepoPage = ({ repo }: { repo: string }) => {
  const { login } = useAuthData();

  const [data, setData] = useState<any>([]);
  const [languages, setLanguages] = useState<any>([]);
  const [lastCommit, setLastCommit] = useState<any>([]);
  const [isFavoriteLocale, setIsFavoriteLocale] = useState(false);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${login}/${repo}/commits`)
      .then((res) => res.json())
      .then((data) => {
        setLastCommit(data[0]);
      });
    fetch(`https://api.github.com/repos/${login}/${repo}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  useEffect(() => {
    fetch(data.languages_url)
      .then((res) => res.json())
      .then((data) => {
        setLanguages(data);
      });

    async function isRepoFavorite() {
      const savedRepos =
        (await getUserSavedRepos(login))?.map((repo) => repo.id) ?? [];

      if (savedRepos.includes(data.id)) {
        setIsFavoriteLocale(true);
      } else {
        setIsFavoriteLocale(false);
      }
    }

    isRepoFavorite();
  }, [data]);

  async function handleFavorite() {
    const newRepoExists = await toggleRepoForUser(login, data);
    console.log("newRepoExists: ", newRepoExists);
    setIsFavoriteLocale(newRepoExists ?? false);
  }
  return (
    <>
      <div className={"w-full flex items-center justify-between gap-2"}>
        <div className={"flex flex-col justify-start gap-2"}>
          <h1 className={"font-bold text-2xl"}>Repository Details</h1>
          <p className={"text-second text-sm"}>
            Explore repository details including creation date, last commit, and
            more key information at a glance.
          </p>
        </div>
        <div className={"flex items-center gap-3"}>
          {data.homepage && (
            <Button
              href={data.homepage}
              as={Link}
              showAnchorIcon
              target={"_blank"}
              variant="bordered"
              className={"font-semibold "}
            >
              Website
            </Button>
          )}
        </div>
      </div>
      <Card
        className={
          "w-full h-fit bg-primary flex flex-row items-start py-5 pl-4 pr-6 border border-[#252525] smooth-animation rounded-lg gap-6"
        }
      >
        <ProgressBarChart header={"Languages"} data={languages} />
        <div className={"w-full h-full flex items-start justify-between"}>
          <div className={"flex flex-col justify-start gap-4"}>
            <RepoInfoView
              label={"Website"}
              value={data.homepage}
              url={data.homepage}
              isLink
            />
            <div className={"flex items-center gap-6"}>
              <RepoInfoView
                label={"Created at"}
                value={calculateTimeAgo(data.created_at)}
              />
              <RepoInfoView
                label={"Updated at"}
                value={calculateTimeAgo(data.updated_at)}
              />
              <RepoInfoView
                label={"Pushed at"}
                value={calculateTimeAgo(data.pushed_at)}
              />
            </div>

            <p className={"text-second text-sm"}>Source</p>
            <RepoInfoView
              url={`${data.html_url}/tree/${data.default_branch}`}
              value={"main"}
              labelIcon={<LuGitBranch size={16} />}
              orientation={"horizontal"}
              isLink={true}
              showAnchorIcon={false}
            />
            <RepoInfoView
              url={lastCommit.html_url}
              value={
                lastCommit?.sha?.slice(0, 7) + " " + lastCommit?.commit?.message
              }
              labelIcon={<LuGitCommit size={16} />}
              orientation={"horizontal"}
              isLink={true}
              showAnchorIcon={false}
            />
          </div>
          <Button
            isIconOnly
            className={"bg-[#141414] text-second"}
            onClick={handleFavorite}
          >
            {isFavoriteLocale ? (
              <FaStar className={"text-white"} size={18} />
            ) : (
              <FaRegStar size={18} />
            )}
          </Button>
        </div>
      </Card>
    </>
  );
};
