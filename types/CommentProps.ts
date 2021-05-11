import { AuthorProps } from "./AuthorProps";

export interface CommentProps {
  comment: string;
  likes: string;
  author: AuthorProps;
}
