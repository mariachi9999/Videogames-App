import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { getVideogameDetail } from "../../store/actions";
import styles from "./VideogameDetail.module.css"
import SearchBar from "../SearchBar/index";


const VideogameDetail = (props) =>  {

  const url_id = props.match.params.id;

  const details = useSelector(state => state.gameDetail)
  const dispatch = useDispatch()  
  
  useEffect(()=> 
      dispatch(getVideogameDetail(url_id)),
      []
    )
  
  const {description, genres, image, name, platforms, rating, released } = details; 

    return (
      <div className={styles.body}>
        {/* Cabecera*/}
        <div id={styles.containerHeader}>
          <div id={styles.addGame}>
            <Link to={`/videogames`}>
              <button id={styles.boton}>Home</button>
            </Link>
          </div>
          <div id={styles.title}>
            <h1>Videogames!</h1>
          </div>
          <div id={styles.searchbar}>
            <SearchBar/>
          </div>
        </div>
        <div className={styles.presentation}>
          <img src={image} alt={image} className={styles.image}/>
          <div className={styles.data}>
            <h2>{name}</h2>              
            <h4>Released:</h4>
            <span>{released}</span>
            <h4>Genres:</h4>
              <ul>
                {genres && genres.map((genre)=>
                <span>{genre}</span>
                )}
              </ul>
            <h4>Platforms:</h4>
              <ul>
                {platforms && platforms.map((platform)=>
                <span>{platform}</span>
                )}
              </ul>
            <h4>Rating:</h4>
            <span>{rating}</span>
          </div>
        </div>
        <div className={styles.description}>
          <h3>Description:</h3>
          <p>{description}</p>
        </div>
      </div>
    );
  }

export default VideogameDetail;