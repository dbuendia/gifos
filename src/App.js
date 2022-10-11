import "./App.css";
import { useEffect, useState } from "react";
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import lupa from "./img/lupa.svg";

function App() {
  const [search, setSearch] = useState("");
  const [petition, setPetition] = useState("");
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchClick = (search) => {
    setPetition(search);
  };

  useEffect(() => {
    let endpoint = `https://api.giphy.com/v1/gifs/search?api_key=1O4a17y8VJJXtXyIK3DwWFj09f5QDNCt&q=${search}&limit=30&offset=0&rating=g&lang=en`;
    fetch(endpoint)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setGifs(response.data);
      });
  }, [petition]);

  return (
    <div className="App">
      <Header />
      <main className="App-body">
        <h1 className="title">
          ¡Inspírate y busca los mejores <b>GIFS</b>!
        </h1>
        <div className="search-bar">
          <input
            type="search"
            placeholder="Busca un GIF"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="btn btn-search"
            onClick={() => handleSearchClick(search)}
          >
            <img src={lupa} className="lupa-icon" alt="lupa" />
          </button>
        </div>
        <div className="gif-container">
          {gifs.map((elem) => (
            <a href={elem.url}>
              <img className="gif" src={elem.images.original.url} />
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
