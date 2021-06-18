import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import styles from "./FilterBox.module.css"

export const FilterBox = (props) => {
    
    const genresOpt = useSelector(store=>store.genres);
    const sourceOpt = ["api","local"];
  
    const [state,setState]= useState({
        genres:"",
        source:""
    })
  
    const handleClick = event =>{
      if(event.target.attributes[1].value === "genre"){
        let newGenres = "";
        state.genres.includes(`${event.target.value}`) === true ?
          newGenres = state.genres
          :
          newGenres = state.genres.concat(`${event.target.value},`)
        setState({...state, genres: newGenres})
      }
  
      if(event.target.attributes[1].value === "source"){
        console.log("entro a source")
        let newSource = "";
        state.source.includes(`${event.target.value}`) === true ?
          newSource = state.source
          :
          newSource = state.source.concat(`${event.target.value},`) 
        setState({...state, source: newSource })
      }
    }

    useEffect(()=>
    props.genres(state.genres),
    [state.genres])
    
    useEffect(()=>
    props.source(state.source),
    [state.source])

  
    const handleCross = event =>{
      if(event.target.attributes[1].value === "genre"){
        let newGenres = state.genres.split(",").filter(g=>g !== event.target.value).join();
        setState({...state, genres: newGenres })
      }
      if(event.target.attributes[1].value === "source"){
        let newSource = state.source.split(",").filter(s=>s !== event.target.value).join();
        setState({...state, source: newSource })
      }
    }

    return (
        <div>
            <h4>FilterBox</h4>
            <div id={styles.genresContainer}>
                <label className={styles.label}>Genres:</label>
                    <select 
                        id="genres"
                        value={state.genres}
                        size="5"
                        className={styles.genresOpt}>
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
            <div id={styles.genresContainer}>
                <label className={styles.label}>Source:</label>
                    <select 
                        id="source"
                        value={state.source}
                        size="2"
                        className={styles.genresOpt}>
                        {sourceOpt && sourceOpt.map(source=>
                        <option value={source} onClick={handleClick} name="source">{source}</option>)}
                    </select>
                    <div className="filterButton">
                        {
                          state.source && state.source.split(",").filter(s=>s.length>0).map(s=>
                            <span className="filterButton">
                              <span className="filterButton">{s}</span>
                              <button className="filterButton" onClick={handleCross} name="source" value={s}>X</button>
                            </span>
                            )
                          }
                    </div>
            </div>
        </div>
    )
}

export default FilterBox;

