import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { getVideogames } from "../../store/actions";

import SearchBar from "../SearchBar/index";
import styles from "./Home.module.css"

import PagingBox from "../PagingBox";
import FilterBox from "../FilterBox";
import OrderBox from "../OrderBox/OrderBox";
import Footer from "../Footer/index.js"


const Home = (props) =>  {
    
  console.log(window.location)

  const dispatch = useDispatch()

  // useEffect(()=> dispatch(getVideogames()), []) 

  var videogamesSearched = useSelector(store=>store.gamesSearched) 
  var videogamesLoaded = useSelector(store=>store.gamesLoaded);
  
  if(window.location.search.includes("name")){
  var videogames = videogamesSearched
  } else {var videogames= videogamesLoaded}
  
  
  //Filtro de genero
  var genre = useSelector(store=>store.filteredGenres)
  if(genre.length > 0){
    var genresToFilter = genre.split(",")
    var filtGamesGenre = []
    videogames.forEach(g=>{
      for(let i=0; i < genresToFilter.length; i++){
        if(g.genres && g.genres.includes(genresToFilter[i])){
          filtGamesGenre.push(g)}
      }})
  }

  if(filtGamesGenre){
    videogames = filtGamesGenre}

  //Filtro de source
  var source = useSelector(store=>store.filteredSources)
  if(source.length > 0){
    var sourceToFilter = source.split(",")
    var filtGamesSource = []
    videogames.forEach(g=>{
      for(let i=0; i < sourceToFilter.length-1; i++){
        if(g.source && g.source === sourceToFilter[i]){
          filtGamesSource.push(g)}
      }})
  }

  if(filtGamesSource){
    videogames = filtGamesSource
  }
  
  //Filtros de ordenamiento
  const alphabetical = useSelector(store=>store.alphabetical);
  const rating = useSelector(store=>store.rating);

  if(videogames){
    
    ///Filtro de ordenamiento alfabético
    if(alphabetical){
      var gamesLowerCase = []
      var gamesLower = [...videogames];
      gamesLower.forEach(g=>{
        g.name = g.name.toLowerCase();
        gamesLowerCase.push(g)
      })
      var gamesLowerSort = 
        gamesLowerCase.sort(function (a, b) {
        if (a.name > b.name) {return 1;}
        if (a.name < b.name) {return -1;}
        return 0;
       })
       
    if(alphabetical === 'descendent'){
      gamesLowerSort.reverse()
    }

    ///// Acá agarro ya el array ordenado y le pongo mayúscula
    if(gamesLowerSort){
    var gamesSortedOK= []
    var gamesSorted = [...gamesLowerSort];
    gamesSorted.forEach(g=>{
      let nombre = g.name.split("")
      nombre[0] = nombre[0].toUpperCase()
      let nombreCorregido = nombre.join("")
      g.name = nombreCorregido;
      gamesSortedOK.push(g)
    })}

    if(gamesSortedOK){
      videogames = gamesSortedOK
    }
  }
    
  //Filtro de ordenamiento por rating
  if(rating){
    var gamesRatingSort = 
      videogames.sort(function (a, b) {
      if (a.rating > b.rating) {return 1;}
      if (a.rating < b.rating) {return -1;}
      return 0;
    })

  if(rating === "descendent"){
    gamesRatingSort.reverse()
  }

  if(gamesRatingSort){
    videogames = gamesRatingSort}
  }
}

  //Paginado
  const videogamesPerPage = 9;
  const pages = Math.ceil(videogames.length / videogamesPerPage)
  const [paginado,setPaginado] = useState(1)
  const page = (value)=>setPaginado(value)
  const endIndex = videogamesPerPage * paginado
  const initIndex = endIndex - videogamesPerPage

  useEffect(()=>
  setPaginado(1),
  [genre])


    return (
      <div id={styles.containerPpal}>
        
        {/* Cabecera*/}
        <div id={styles.containerHeader}>
          <div id={styles.addGame}>
            <Link to={`/videogame`}>
              <button id={styles.boton}>Add a Videogame!</button>
            </Link>
          </div>
          <div id={styles.title}>
            <h1>Videogames!</h1>
          </div>
          <div id={styles.searchbar}>
            <SearchBar/>
          </div>
        </div>


        {/* Cuerpo */}
        <div id={styles.containerCuerpoPpal}>

          <div id={styles.filtros}>
            <div id={styles.filterBox}>
              <FilterBox/>
            </div>
            <div id={styles.orderBox}>
              <OrderBox />
            </div>
          </div>

          <div id={styles.videogamesBox}>

            <div id={styles.cardsContainer}>
              {videogames.length > 0 ? 
              <div className={styles.cards}>
                {videogames && videogames.slice(initIndex,endIndex).map(games =>
                  <div key={games.id} className={styles.games}>
                    <div className={styles.gameTitle}>
                      <Link to={`/videogames/${games.id}`} className={styles.navLink}>
                        <span className={styles.colorTitle}>{games.name}</span>
                      </Link>
                    </div>
                    <div className={styles.gameImage}>
                      <img src={games.image} alt="alternatetext" className={styles.cardImage}/>
                    </div>
                    <div className={styles.gameGenres}>
                      {games.genres && games.genres.map(g=>
                        <span>{g}</span>  
                      )}
                    </div> 
                  </div> 
                )}
              </div>
              : 
              <div className={styles.loading}></div>
              }
            </div>

            <div id={styles.paginado}>
              <PagingBox pages={pages} page={page}/>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div id={styles.containerFooter}>
          <Footer/> 
        </div>

      </div>
    );
  }

  export default Home; 