import Repo from "@/types/repo";
import { Card } from "@nextui-org/card";
import { Link, Button } from "@nextui-org/react";
import { GrGithub } from "react-icons/gr";
import { GoRepo } from "react-icons/go";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { useState } from "react";
import { useAuthData } from "@/utils/auth";
import { toggleRepoForUser } from "@/actions/home";
import { useRouter } from "next/navigation";

export function RepoView({
  repo,
  search = "",
  ...props
}: {
  repo: Repo;
  search: string | undefined;
}) {
  const { login } = useAuthData();
  const router = useRouter();

  const [isFavoriteLocale, setIsFavoriteLocale] = useState(
    repo.isSaved ?? false
  );

  const highlightedName = repo.name.replace(
    new RegExp(search.length > 0 ? search : "", "gi"),
    (match) => `<h1 class="highlighted-text-search">${match}</h1>`
  );

  async function handleFavorite() {
    const newRepoExists = await toggleRepoForUser(login, repo);
    console.log("newRepoExists: ", newRepoExists);
    setIsFavoriteLocale(newRepoExists ?? false);
  }

  return (
    <Card
      onClick={() => {
        router.push(`repo/${repo.name}`);
      }}
      isPressable={true}
      className={
        "bg-primary py-5 pl-4 pr-6 border border-[#252525] hover:border-[#ededed] smooth-animation rounded-lg gap-2"
      }
      {...props}
    >
      {/*  Header*/}
      <div
        className={
          "w-full h-fit grid grid-cols-[30px,1fr,25px] gap-3 items-center"
        }
      >
        <GoRepo size={32} className={"text-second"} />
        <div className={"h-fit flex flex-col  items-start"}>
          <div className={"flex items-center gap-2"}>
            <h1
              className={"font-medium flex ellipsis-overflow"}
              dangerouslySetInnerHTML={{ __html: highlightedName }}
            />

            {repo.fork && (
              <span className={"badge badge-warning font-semibold"}>fork</span>
            )}
          </div>
          <h2 className={"text-second text-sm"}>{repo.language}</h2>
        </div>
        <Button isIconOnly className={"bg-[#141414] text-second self-start"}>
          {isFavoriteLocale ? (
            <FaStar
              className={"text-white"}
              size={18}
              onClick={handleFavorite}
            />
          ) : (
            <FaRegStar size={18} onClick={handleFavorite} />
          )}
        </Button>
      </div>
      <Button
        href={repo.html_url}
        as={Link}
        target={"_blank"}
        color="default"
        variant="solid"
        className={"w-fit bg-[#141414]"}
        startContent={<GrGithub size={17} />}
      >
        {repo.full_name}
      </Button>
    </Card>
  );
}
