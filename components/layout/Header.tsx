"use client";
import { Image } from "@nextui-org/image";
import { Divider } from "@nextui-org/divider";
import { ProfileOptions } from "@/components/ProfileOptions";
import { Link } from "@nextui-org/link";
import { useAuthData } from "@/utils/auth";
import { Avatar } from "@nextui-org/react";
import React from "react";

export function Header({ breadcrumb }: { breadcrumb?: React.ReactNode }) {
  const { login, avatar_url } = useAuthData();
  return (
    <div
      className={"w-full h-10  flex items-center justify-between gap-3  px-6"}
    >
      <div className={"flex items-center gap-3"}>
        <Link href={"/profile"}>
          <Image src="/logo.png" alt="logo" width={25} height={25} />
        </Link>
        <Divider
          orientation={"vertical"}
          className={"h-4  rotate-12 bg-[#2d2d2d]"}
        />
        <Link
          href={"/profile"}
          className={"flex items-center gap-3 text-white"}
        >
          <Avatar
            isBordered
            as="button"
            className="transition-transform w-6 h-6"
            src={avatar_url}
          />
          <h1 className={"font-semibold"}>{login}</h1>
        </Link>

        {breadcrumb && (
          <>
            <Divider
              orientation={"vertical"}
              className={"h-4  rotate-12 bg-[#2d2d2d]"}
            />
            {breadcrumb}
          </>
        )}
      </div>
      <ProfileOptions />
    </div>
  );
}
