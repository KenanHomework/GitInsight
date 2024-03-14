import { RepoPage } from "@/pages/RepoPage";
import { Metadata } from "next";

export const metadata: Metadata = {};

export default function Page({ params }: { params: { repo: string } }) {
  const { repo } = params;
  metadata.title = ` ${repo} - Overview - Git Insight`;
  return (
    <div
      className={
        "w-full min-h-screen  flex flex-col items-center gap-10 py-6 pt-8"
      }
    >
      <RepoPage repo={repo} />
    </div>
  );
}
