"use client";

import style from "./page.module.css";
import UserList from "../components/Users";
import useGetUsers from "../hooks/useGetUsers";
import { useState, useEffect, useRef } from "react";

function App() {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const userListRef = useRef<HTMLUListElement | null>(null);
  const { users, setUsers, error } = useGetUsers(searchText, page);

  const handleClickOutside = (event: any) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      setUsers([]);
    }
  };

  const handleScroll = () => {
    if (
      userListRef.current &&
      userListRef.current.clientHeight + userListRef.current.scrollTop + 1 >=
        userListRef.current.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={style.container}>
      <h1 className={style.title}>Github Typeahead</h1>
      <div className={style.wrapper} ref={wrapperRef}>
        <input
          className={style.input}
          type="text"
          value={searchText}
          onChange={(event) => {
            setSearchText(event.target.value);
            setUsers([]);
          }}
          placeholder="Search for users..."
          spellCheck={false}
        />
        {error && <p className={style.errorText}>{error.message}</p>}
        <UserList userRef={userListRef} users={users} />
      </div>
    </div>
  );
}

export default App;
