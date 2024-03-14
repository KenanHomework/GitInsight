import { Metadata } from "next";
import { ProfilePage } from "@/pages/ProfilePage";

export const metadata: Metadata = {
  title: "Profile - Git Insight",
};

export default function Page() {
  return (
    <div
      className={
        "w-full min-h-screen  flex  items-center justify-center gap-10 py-6"
      }
    >
      <ProfilePage />
    </div>
  );
}
