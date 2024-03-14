"use client";
import Image from "next/image";
import style from "./page.module.css";
import useGetUsers from "../hooks/useGetUsers";
import { useState, useEffect, useRef } from "react";
interface User {
  html_url: string;
  id: string;
  login: string;
  avatar_url: string;
}

function App() {
  const userListRef = useRef<HTMLDivElement | null>(null);
  const [searchText, setSearchText] = useState("");
  const { users, setUsers, isLoading, error } = useGetUsers(searchText);

  const handleClickOutside = (event: any) => {
    if (
      userListRef.current &&
      !userListRef.current.contains(event.target as Node)
    ) {
      setUsers([]);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={style.container}>
      <h1>Github Typeahead</h1>
      <div className={style.wrapper} ref={userListRef}>
        <input
          className={style.input}
          type="text"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Search for users..."
          spellCheck={false}
        />
        {error && <p className={style.errorText}>{error.message}</p>}
        {isLoading ? (
          <p className={style.loadingText}>Loading...</p>
        ) : (
          <ul className={style.userList}>
            {users &&
              users.map((user: User) => (
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noreferrer"
                  key={user.id}
                >
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
        )}
      </div>
    </div>
  );
}

export default App;
