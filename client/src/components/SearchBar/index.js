import React, {useState} from "react";
import {useDispatch} from "react-redux";
import styles from "./SearchBar.module.css";
import { Link } from "react-router-dom";
// import { searchVideogames } from "../../store/actions";
import { getVideogames } from "../../store/actions";


const SearchBar = () =>  {
    
    const [state,setState] = useState({
        name : ""
    })

    const dispatch = useDispatch()

    const handleChange = event => {
        setState({...state, [event.target.name] : event.target.value})
    }
    
    const handleSubmit = e => {
        // e.preventDefault();
        console.log(state.name);
        dispatch(getVideogames(state.name))        
    }

    return (
        <div id={styles.buscador}>
            <form id={styles.form}>
                <input 
                    type="text" 
                    placeholder="Busca tu videogame favorito :)"
                    value={state.name}
                    name= "name"
                    onChange={(e) => handleChange(e)}
                    id={styles.barra}
                    >
                </input>
                <Link to={`/videogames?name=${state.name}`}>
                    <button type="submit" onClick={(e)=>handleSubmit(e)} id={styles.boton}>Buscar!</button>
                </Link>
            </form>
        </div>
    );
};

export default SearchBar; 