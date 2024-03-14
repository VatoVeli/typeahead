"use client";
import { User } from "../types/types";
import { useState, useEffect } from "react";

const API_URL = "https://api.github.com/search/users";

const useGetUsers = (searchText: string, page: number) => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);

      if (searchText.trim() === "") {
        setUsers([]);
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}?q=${searchText}&per_page=10&page=${page}`
        );
        if (!response.ok) {
          throw new Error(`API request failed! Try again in 10 seconds`);
        }
        const data = await response.json();
        setUsers((prev) => {
          return [...prev, ...data.items];
        });
      } catch (err: any) {
        setUsers([]);
        setError(err);
      }
    };

    fetchData();
  }, [searchText, page]);

  return { users, error, setUsers };
};

export default useGetUsers;
