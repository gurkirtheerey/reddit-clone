import { AuthorProps } from "./AuthorProps";
import { CommentProps } from "./CommentProps";

export interface PostProps {
  id: string;
  title: string;
  createdAt: string;
  content: string;
  author: AuthorProps;
  comments: CommentProps[];
  uplikePost: () => void;
  downlikePost: () => void;
  upLikesFrom: any[];
  downLikesFrom: any[];
  userId: number;
  subthread: any;
}
