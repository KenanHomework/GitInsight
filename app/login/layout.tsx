import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import React, { Key } from "react";
import { Providers } from "@/app/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Login - Git Insight",
  description:
    "GitInsight is a tool to explore GitHub users and their repositories, providing comprehensive insights into commit histories and more",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
