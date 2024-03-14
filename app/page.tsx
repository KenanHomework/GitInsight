"use client";
import { redirect, useRouter } from "next/navigation";
import { useUserSignedIn } from "@/utils/auth";

export default function Home() {
  const router = useRouter();
  const userSignedIn = useUserSignedIn();

  if (!userSignedIn) {
    router.push("/login");
  }
  redirect("/profile");
}
