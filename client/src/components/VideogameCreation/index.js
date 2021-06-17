import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import SearchBar from "../SearchBar";
import styles from "./VideogameCreation.module.css"
import { addVideogame } from "../../store/actions";



const VideogameCreation = (props) =>  {


  const genresOpt = useSelector(store=>store.genres);
  const platformsOpt = useSelector(store=>store.platforms) 

  const dispatch = useDispatch()  

  const [state,setState]= useState({
    name:"",
    description:"",
    released:"",
    rating:"",
    platforms:"",
    genres:""
  })

  const handleChange = event => {
    setState({...state, [event.target.id]: event.target.value });
  }

  const handleClick = event =>{

    if(event.target.attributes[1].value === "platform"){
      let newPlatforms = "";
      state.platforms.includes(`${event.target.value}`) === true ?
        newPlatforms = state.platforms
        :
        newPlatforms = state.platforms.concat(`${event.target.value},`)
      setState({...state, platforms: newPlatforms})
    }

    if(event.target.attributes[1].value === "genre"){
      console.log("entro a platform")
      let newGenres = "";
      state.genres.includes(`${event.target.value}`) === true ?
        newGenres = state.genres
        :
        newGenres = state.genres.concat(`${event.target.value},`) 
      setState({...state, genres: newGenres })
    }
  }

  const handleCross = event =>{
    if(event.target.attributes[1].value === "platform"){
      let newPlatforms = state.platforms.split(",").filter(p=>p !== event.target.value).join();
      setState({...state, platforms: newPlatforms })
    }
    if(event.target.attributes[1].value === "genre"){
      let newGenres = state.genres.split(",").filter(g=>g !== event.target.value).join();
      setState({...state, genres: newGenres })
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(addVideogame(state));
    setState({
      name:"",
      description:"",
      released:"",
      rating:"",
      platforms:"",
      genres:""
    })
  }
  
    return (
      <div>
        <div className={styles.cabecera}>
          <SearchBar/>
          <h2>Add a Videogame</h2>
          <Link to={`/videogames`}>
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
              <label className={styles.label} htmlFor="platforms">Platforms: </label>
              <select 
              id="platforms"
              value={state.platforms}
              size="5">
                {platformsOpt && platformsOpt.map(platform=>
                  <option value={platform} onClick={handleClick} name="platform">{platform}</option>)}
              </select>
              <div className="filterButton">
                {
                  state.platforms && state.platforms.split(",").filter(p=>p.length>0).map(p=>
                    <span className="filterButton">
                      <span className="filterButton">{p}</span>
                      <button className="filterButton" onClick={handleCross} name="platform" value={p}>X</button>
                    </span>
                    )
                }
              </div>
              <label className={styles.label} htmlFor="genres">Genres: </label>
              <select 
              id="genres"
              value={state.genres}
              size="5">
                {genresOpt && genresOpt.map(genre=>
                  <option value={genre} onClick={handleClick} name="genre">{genre}</option>)}
              </select>
              <div className="filterButton">
                {
                  state.genres && state.genres.split(",").filter(g=>g.length>0).map(g=>
                    <span className="filterButton">
                      <span className="filterButton">{g}</span>
                      <button className="filterButton" onClick={handleCross} name="genre" value={g}>X</button>
                    </span>
                    )
                }
              </div>
            </div>
            <button type="submit">Add!</button>
          </form>
        </div>
      </div>
    )

  }


export default VideogameCreation;