import "./Searchbox.scss";

interface SearchboxProps {
  query: string;
  setQuery: (query: string) => void;
}

const Searchbox = ({ query, setQuery }: SearchboxProps) => {
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="Searchbox"
      placeholder="Search..."
    />
  );
};

export default Searchbox;
