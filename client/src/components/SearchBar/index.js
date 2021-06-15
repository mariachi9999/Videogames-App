import React, { Component } from "react";
import styles from "./SearchBar.module.css"



const SearchBar = () =>  {
    
    // const dispatch = useDispatch()

    return (
        <div id={styles.buscador}>
            <label>Buscar: </label>
            <form>
                <input type="text" placeholder="Busca tu videogame favorito :)"></input>
            </form>
        </div>
    );
};

export default SearchBar; 