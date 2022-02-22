import "./Footer.scss";
import GiphyLogo from "../../assets/giphy-logo.png";

const Footer = () => {
  return (
    <footer className="Footer">
      <span>&copy; 2022 Marek Hückmann</span>
      <span className="Footer__giphy-info">
        Powered by
        <img className="Footer__giphy-logo" src={GiphyLogo} alt="Giphy Logo" />
      </span>
    </footer>
  );
};

export default Footer;
