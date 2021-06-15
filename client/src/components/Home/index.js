import React, { Component } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { getVideogames } from "../../store/actions";

import SearchBar from "../SearchBar/index";
import styles from "./Home.module.css"



const Home = (props) =>  {
    
    console.log(props.videogames)
    
    const videogames = useSelector(store=>store.gamesLoaded); 
    const dispatch = useDispatch()

    useEffect(()=>
        dispatch(getVideogames()),
        []
    ) 

    return (
      <div>
        <div className={styles.cabecera}>
          <SearchBar className={styles.searchbar}/>
          <h1>Videogames!</h1>
          <Link to={`/videogame`}>
                <button>Add a Videogame!</button>
          </Link>
        </div>
        <div id={styles.container}>
        {videogames.length > 0 ? 
        <ul className={styles.cards}>
          {videogames && videogames.map(games =>
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
      </div>
    );
  }

  export default Home; 