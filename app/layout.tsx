import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React, { Key } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { LayoutProviderContainer } from "@/components/layout/LayoutProviderContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Git Insight",
  description:
    "GitInsight is a tool to explore GitHub users and their repositories, providing comprehensive insights into commit histories and more",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <LayoutProviderContainer>{children}</LayoutProviderContainer>
      </body>
    </html>
  );
}
