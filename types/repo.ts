export default interface Repo {
  id: string;
  name: string;
  full_name: string;
  html_url: string;
  url: string;
  language: string;
  fork: boolean;
  isSaved?: boolean;
}
