import { Metadata } from "next";
import { CommitsPage } from "@/pages/CommitsPage";

export const metadata: Metadata = {};

export default function Page({ params }: { params: { repo: string } }) {
  const { repo } = params;
  metadata.title = ` ${repo} - Commits - Git Insight`;
  return (
    <div
      className={
        "w-full min-h-screen  flex flex-col items-center gap-10 py-6 pt-8"
      }
    >
      <CommitsPage repo={repo} />
    </div>
  );
}
