import { ReposPage } from "@/pages/ReposPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Repos - Git Insight",
};

export default function Page() {
  return (
    <div className="w-full min-h-screen  flex flex-col items-center gap-10 py-6">
      <ReposPage />
    </div>
  );
}
