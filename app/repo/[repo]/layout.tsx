import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import React, { Key } from "react";
import { Providers } from "@/app/providers";
import { MainLayout } from "@/components/layout/MainLayout";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/react";
import { GrGithub } from "react-icons/gr";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  description:
    "GitInsight is a tool to explore GitHub users and their repositories, providing comprehensive insights into commit histories and more",
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { repo: string };
}) {
  const { repo } = params;
  return (
    <MainLayout
      repoName={params.repo}
      tabs={[
        {
          url: `/repo/${repo}`,
          label: "Repository",
        },
        {
          url: `/repo/${repo}/analytics`,
          label: "Analytics",
        },
        {
          url: `/repo/${repo}/commits`,
          label: "Commits",
        },
      ]}
      breadcrumb={
        <Link
          href={`/repo/${repo}`}
          className={"flex items-center gap-3 text-white"}
        >
          <GrGithub className={"w-6 h-6"} />
          <h1 className={"font-semibold"}>{repo}</h1>
        </Link>
      }
    >
      {children}
    </MainLayout>
  );
}
