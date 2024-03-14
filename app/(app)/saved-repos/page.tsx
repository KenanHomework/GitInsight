import { Metadata } from "next";
import SavedReposPage from "@/pages/SavedReposPage";

export const metadata: Metadata = {
  title: "Favorite Repos - Git Insight",
};

export default function Page() {
  return (
    <div className="w-full min-h-screen  flex flex-col items-center gap-10 py-6">
      <SavedReposPage />
    </div>
  );
}
