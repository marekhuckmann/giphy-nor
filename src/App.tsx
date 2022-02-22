import { useEffect, useState } from "react";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import Gif from "./components/Gif/Gif";
import Searchbox from "./components/Searchbox/Searchbox";
import { IGif } from "@giphy/js-types";
import Header from "./components/Header/Header";
import InfiniteScroll from "react-infinite-scroller";
import useApi from "./hooks/useApi";
import useDebounce from "./hooks/useDebounce";

const LIMIT = 12;

const App = () => {
  const [gifs, setGifs] = useState<IGif[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { fetchGifs, isLastPage } = useApi({
    gifs,
    setGifs,
    setIsLoading,
  });

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const url = (page: number): string =>
    `https://api.giphy.com/v1/gifs/search?api_key=${
      process.env.REACT_APP_GIPHY_API_KEY
    }&q=${query}&limit=${String(LIMIT)}&offset=${String(
      page * LIMIT
    )}&rating=G&lang=en`;

  useEffect(() => {
    if (debouncedQuery.trim() === "") {
      setGifs([]);
      return;
    }

    fetchGifs(url(0), true);

    // comment below is for ignoring "url" and "fetchGifs"
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  return (
    <div className="App">
      <Header />
      <main>
        <Searchbox query={query} setQuery={setQuery} />
        {gifs.length > 0 && (
          <p className="App__hint">
            Hint: Click on a GIF to copy its link to clipboard
          </p>
        )}
        <InfiniteScroll
          className="App__gifs-container"
          pageStart={0}
          loadMore={(page) => {
            fetchGifs(url(page));
          }}
          // !isLoading prevents double calls
          // see: https://github.com/danbovey/react-infinite-scroller#double-or-non-stop-calls-to-loadmore
          hasMore={!isLastPage && !isLoading}
          loader={
            <div key="0">
              {debouncedQuery.trim() !== "" && isLoading && (
                <div className="App__loader">
                  <p className="App__loader-text">LOADING...</p>
                </div>
              )}
            </div>
          }
          initialLoad={false}
        >
          {gifs.map((gif) => (
            <Gif className="App__gif" gif={gif} key={gif.id} />
          ))}
        </InfiniteScroll>
      </main>
      <Footer />
    </div>
  );
};

export default App;
