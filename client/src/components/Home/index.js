import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { getVideogames } from "../../store/actions";

import SearchBar from "../SearchBar/index";
import styles from "./Home.module.css"

import PagingBox from "../PagingBox";
import FilterBox from "../FilterBox";


const Home = (props) =>  {
    
  const dispatch = useDispatch()
  useEffect(()=>
  dispatch(getVideogames()),
  []) 

  const videogames = useSelector(store=>store.gamesLoaded);
 
  //Filtro de genero
  const [genre,setGenre] = useState([])
  const selGenre = (value)=>setGenre(value)

  console.log(videogames)
  console.log(genre.length)
  if(genre.length > 0){
    
    var genresToFilter = genre.split(",")
    console.log(genresToFilter)
    var filteredVideogames = []
    console.log(filteredVideogames)
    videogames.forEach(g=>{
      for(let i=0; i < genresToFilter.length; i++){
        if(g.genres && g.genres.includes(genresToFilter[i])){
          filteredVideogames.push(g)
        }
      }})
    console.log(filteredVideogames)
  }

  //       if(genresToFilter.includes(genre)){
  //         filteredVideogames.push(g) 
  //       }
  //     })
  //   })
  //   console.log(filteredVideogames)
  // }


  //Paginado
  const videogamesPerPage = 15;
  const pages = Math.ceil(videogames.length / videogamesPerPage)
  const [paginado,setPaginado] = useState(1)
  const page = (value)=>setPaginado(value)
  const endIndex = videogamesPerPage * paginado
  const initIndex = endIndex - videogamesPerPage



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
        <FilterBox genres={selGenre}/>
      </div>
    );
  }

  export default Home; 