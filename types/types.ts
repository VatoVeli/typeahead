export interface User {
  html_url: string;
  id: string;
  login: string;
  avatar_url: string;
}

export interface UserListProps {
  users: User[];
  userRef: React.RefObject<HTMLUListElement>
}