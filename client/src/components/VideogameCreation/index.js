import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import SearchBar from "../SearchBar";
import styles from "./VideogameCreation.module.css"


const VideogameCreation = (props) =>  {


  const genres = useSelector(store=>store.genres);
  const platforms = useSelector(store=>store.platforms) 

  const [state,setState]= useState({
    name:"",
    description:"",
    released:"",
    rating:"",
    platforms:"",
    genres:""
  })

  const handleChange = event => setState({...state, [event.target.id]: event.target.value });

  function handleClick(id){
    props.getMovieDetail(id)
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.getMovies(state.title);
  }
  
  const arrPages = [];
  
  function pages (results){
    const pages = Math.ceil(results / 10)
    for (var i = 1; i <= pages; i++) {
      arrPages.push(i)
    }
    console.log(arrPages);
    arrPages.forEach(page=>console.log(page))
    return arrPages
  }

  pages(props.movieTotalResults);

  const { name, description } = state;

    return (
      <div>
        <div className={styles.cabecera}>
          <SearchBar/>
          <h2>Add a Videogame</h2>
          <Link to={`/home`}>
              <button>Home</button>
          </Link>
        </div>
        <div className={styles.formulario}>
          <form className={styles.campos} onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label className={styles.label} htmlFor="name">Title: </label>
              <input
                type="text"
                id="name"
                autoComplete="off"
                value={state.name}
                onChange={(e) => handleChange(e)}
              />
              <label className={styles.label} htmlFor="description">Description: </label>
              <textarea
                type="text"
                id="description"
                rows="10" 
                cols="50"
                autoComplete="off"
                value={state.description}
                onChange={(e) => handleChange(e)}
              />
              <label className={styles.label} htmlFor="released">Released: </label>
              <input
                type="date"
                id="released"
                autoComplete="off"
                value={state.released}
                onChange={(e) => handleChange(e)}
              />
              <label className={styles.label} htmlFor="rating">Rating: </label>
              <input
                type="number"
                placeholder="5.0"
                step="0.1"
                min="0"
                max="10"
                id="rating"
                autoComplete="off"
                value={state.rating}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <button type="submit">Add!</button>
          </form>
        </div>
      </div>
    )

  }


export default VideogameCreation;