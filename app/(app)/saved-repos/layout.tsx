import React from "react";

export const metadata = {
  title: "Favorite Repos | Git Insight",
  description:
    "Discover and manage your favorite repositories easily. Access the projects you love and stay inspired on your coding journey",
};

export default function SavedPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
