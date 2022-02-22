import { IGif } from "@giphy/js-types";
import { useCallback, useState } from "react";
import "./Gif.scss";

interface GifProps {
  className?: string;
  gif: IGif;
}

const Gif = ({ className, gif }: GifProps) => {
  const [popupText, setPopupText] = useState("");

  const copyToClipboard = useCallback((url: string) => {
    navigator.clipboard
      .writeText(url)
      .then(
        () => {
          setPopupText(`GIF's url copied to clipboard!`);
        },
        () => {
          setPopupText(`Error occurred, GIF's url not copied to clipboard.`);
        }
      )
      .finally(() => {
        setTimeout(() => {
          setPopupText("");
        }, 2000);
      });
  }, []);

  return (
    <article
      className={`${className} Gif`}
      onClick={() => copyToClipboard(gif.images.original.url)}
    >
      <img
        className="Gif__image"
        src={gif.images.fixed_width_downsampled.url}
        alt={gif.title}
      />
      <div className="Gif__title-wrapper">
        <p className="Gif__title">{gif.title}</p>
      </div>

      <div className="Gif__pop-up">{popupText}</div>
    </article>
  );
};

export default Gif;
