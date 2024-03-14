"use client"
import { useState, useEffect } from "react";

const API_URL = "https://api.github.com/search/users";

const useGetUsers = (searchText: string) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      if (searchText.trim() === "") {
        setUsers([]);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}?q=${searchText}`);
        if (!response.ok) {
          throw new Error(`API request failed! Try again in 10 seconds`);
        }
        const data = await response.json();
        setUsers(data.items);
      } catch (err: any) {
        setUsers([]);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchText]);

  return { users, isLoading, error, setUsers };
};

export default useGetUsers;
