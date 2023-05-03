import { useState, useEffect } from 'react';

/**
 * A hook that fetches data from the API
 * @param {string} url - passes the url of the API targeted.
 */
function useApi(url) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setIsError(false);

        const fetchedData = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const json = await fetchedData.json();

        setData(json);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [url, token]);
  return { data, isLoading, isError };
}

export default useApi;