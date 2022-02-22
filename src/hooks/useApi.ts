import { useState } from "react";
import { IGif } from "@giphy/js-types";

interface UseApiProps {
  gifs: IGif[];
  setGifs: (gifs: IGif[]) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const useApi = ({ gifs, setGifs, setIsLoading }: UseApiProps) => {
  const [isLastPage, setIsLastPage] = useState(false);

  const fetchGifs = (url: string, newQuery?: boolean) => {
    setIsLoading(true);
    fetch(url)
      .then((response) => {
        if (response.status !== 200) {
          console.error(
            "Looks like there was a problem. Status Code: " + response.status
          );
          setIsLoading(false);
          return;
        }

        response.json().then((response) => {
          const { data, pagination } = response;
          if (!newQuery) {
            setGifs([...gifs, ...data]);
          } else {
            setGifs(data);
          }

          setIsLastPage(
            pagination.total_count - pagination.offset <= pagination.count
          );

          setIsLoading(false);
        });
      })
      .catch((err) => {
        console.error("Fetch error: ", err);
        setIsLoading(false);
      });
  };

  return { fetchGifs, isLastPage };
};

export default useApi;
