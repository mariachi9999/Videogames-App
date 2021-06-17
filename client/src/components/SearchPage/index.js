import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { getVideogames } from "../../store/actions";

import SearchBar from "../SearchBar/index";
import styles from "../Home/Home.module.css"

import PagingBox from "../PagingBox";

const SearchPage = (props) =>  {

    const videogames = useSelector(store=>store.gamesSearched);
    
    const videogamesPerPage = 15;
    const pages = Math.ceil(videogames.length / videogamesPerPage)
    const [state,setState] = useState(1)
    const page = (value)=>setState(value)

    const endIndex = videogamesPerPage * state
    const initIndex = endIndex - videogamesPerPage


    return (
      <div>
        <div className={styles.cabecera}>
          <SearchBar className={styles.searchbar}/>
          <h1>Resultados de tu búsqueda!</h1>
          <Link to={`/videogame`}>
                <button>Add a Videogame!</button>
          </Link>
        </div>
        <div id={styles.container}>
        {videogames.length > 0 ? 
        <ul className={styles.cards}>
          {videogames && videogames.slice(initIndex,endIndex).map(games =>
            <div key={games.id} className={styles.games}>
              <Link to={`/videogames/${games.id}`}>
                <div>{games.name}</div>
              </Link>
              <img src={games.image} alt="alternatetext"/> 
            </div> 
          )}
        </ul>
        : 
        <div className={styles.loading}></div>
        }
        </div>
        <PagingBox pages={pages} page={page}/>
      </div>
    );
  }

  export default SearchPage; 