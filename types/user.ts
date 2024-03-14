import Repo from "@/types/repo";

export default interface User {
  id: string;
  login: string;
  name: string;
  avatar_url: string;
  url: string;
  savedRepos: Repo[];
}
