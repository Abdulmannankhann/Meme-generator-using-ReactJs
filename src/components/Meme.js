import React from "react";
import memeData from "../MemeData";

function Meme() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMeme, setAllMeme] = React.useState();

  function getMemeImage() {
    let r = Math.trunc(Math.random() * allMeme.length);
    const url = allMeme[r].url;
    setMeme((preMeme) => ({
      ...preMeme,
      randomImage: url,
    }));
  }

  function handleChange(event) {
    setMeme((preMeme) => {
      const { name, value } = event.target;
      return {
        ...preMeme,
        [name]: value,
      };
    });
  }

  React.useEffect(function () {
    async function gettingMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMeme(data.data.memes);
    }
    gettingMemes();
  }, []);

  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          className="form--input"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="form--input"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button onClick={getMemeImage} className="form--button">
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="meme--image" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}

export default Meme;
