import { useEffect, useState } from "react";

// Make sure the name starts with use, to be recognised by React as an hook function.
export const useFetch = (fetchFn) => {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({
          message: error.message || "Could not fetch data.",
        });
      }
      setIsFetching(false);
    };
  }, [fetchFn]);

  return {
    isFetching,
    fetchedData,
    error
  }
};
