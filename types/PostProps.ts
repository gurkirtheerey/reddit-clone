import { Author } from "./AuthorProps";

export interface PostProps {
  title: string;
  createdAt: string;
  content: string;
  author: Author;
}
