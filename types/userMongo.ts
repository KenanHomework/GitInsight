import Repo from "@/types/repo";

export default interface UserMongo {
  login: string;
  savedRepos: Repo[];
}
