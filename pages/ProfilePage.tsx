"use client";
import { Image } from "@nextui-org/react";
import { useAuthData } from "@/utils/auth";
import { Card } from "@nextui-org/card";

export const ProfilePage = () => {
  const { login } = useAuthData();
  return (
    <div className={"w-full flex flex-col gap-2"}>
      <Card
        className={
          "w-full h-fit bg-primary flex flex-row items-start py-5 pl-4 pr-6 border border-[#252525] smooth-animation rounded-lg gap-6"
        }
      >
        <Image
          src={`https://github-readme-activity-graph.vercel.app/graph?username=${login}&theme=github-compact&hide_border=true`}
          alt="GitHub Streak"
          radius={"none"}
        />
      </Card>
      <div>
        <Card
          className={
            "w-full bg-primary flex flex-row items-center justify-around py-5 pl-4 pr-6 border border-[#252525] smooth-animation rounded-lg gap-6"
          }
        >
          <Image
            src={`https://streak-stats.demolab.com?user=${login}&theme=dark&hide_border=true`}
            alt="GitHub Streak"
            radius={"none"}
          />
          <Image
            src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${login}&theme=dark&hide_border=true`}
            alt="Most used languages"
            radius={"none"}
          />
        </Card>
      </div>
    </div>
  );
};
