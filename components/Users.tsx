import React from "react";
import Image from "next/image";
import { User } from "../types/types";
import style from "./Users.module.css";
import { UserListProps } from "../types/types";

const UserList: React.FC<UserListProps> = ({ users, userRef }) => {
  return (
    <ul className={style.userList} ref={userRef}>
      {users.map((user: User) => (
        <a href={user.html_url} target="_blank" rel="noreferrer" key={user.id}>
          <li>
            <Image
              src={user.avatar_url}
              width={45}
              height={45}
              alt={user.login}
              className={style.userImage}
            />
            <span>{user.login}</span>
          </li>
        </a>
      ))}
    </ul>
  );
};

export default UserList;
