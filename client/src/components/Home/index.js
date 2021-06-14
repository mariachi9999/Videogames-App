import React, { Component } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { getVideogames } from "../../store/actions";



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
        <h2>Buscador</h2>
        <ul>
          {videogames && videogames.map(games =>
            <div key={games.id}>
              <Link to={`/videogames/${games.name}`}>
                <div>{games.name}</div>
              </Link>
              <img src={games.image} alt="alternatetext"/> 
            </div> 
          )}
        </ul>
      </div>
    );
  }

  export default Home; 