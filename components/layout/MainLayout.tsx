"use client";
import { Header } from "@/components/layout/Header";
import { MainNavbar } from "@/components/layout/MainNavbar";
import { Divider } from "@nextui-org/divider";
import { Providers } from "@/app/providers";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthData, useUserSignedIn } from "@/utils/auth";
import { Footer } from "@/components/layout/Footer";
import NavTab from "@/types/navTab";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/react";

export const MainLayout = ({
  children,
  tabs,
  repoName,
  breadcrumb,
}: {
  tabs: NavTab[];
  children: React.ReactNode;
  repoName?: string;
  breadcrumb?: React.ReactNode;
}) => {
  const { login } = useAuthData();
  const router = useRouter();
  const userSignedIn = useUserSignedIn();

  useEffect(() => {
    if (!userSignedIn) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <div className={"bg-primary pt-3 flex flex-col gap-2 sticky top-0 z-10"}>
        <Header breadcrumb={breadcrumb} />
        <MainNavbar tabs={tabs} />
        <Divider />
      </div>
      <Providers>
        <div className={"w-full h-full flex flex-col items-center"}>
          {repoName && (
            <div className={"w-full h-fit max-w-[1260px]"}>
              <div
                className={
                  "w-full  flex items-center justify-between gap-10 py-6"
                }
              >
                <h1 className="text-3xl font-semibold">{repoName}</h1>
                <Button
                  href={`https://github.com/${login}/${repoName}`}
                  as={Link}
                  target={"_blank"}
                  color="default"
                  variant="bordered"
                  className={"w-fit   font-semibold"}
                  radius={"sm"}
                >
                  Git Repository
                </Button>
              </div>
            </div>
          )}
          {repoName && <Divider />}
          <div className={"w-full h-full max-w-[1260px]"}>{children}</div>
        </div>
      </Providers>
      <div className={"bg-primary pt-3 flex flex-col gap-2 sticky top-0 z-10"}>
        <Divider />
        <Footer />
      </div>
    </>
  );
};
