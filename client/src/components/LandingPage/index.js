import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { getVideogames } from "../../store/actions";
import styles from "./landingPage.module.css"

const LandingPage = (props) =>  {
 
    return (
      <div className={styles.home} id={styles.contain}>
        <Link to={`/home`}>
          <button className={styles.homeButton}>Busca tu videogame favorito!</button>
        </Link>
      </div>
    );
  }

export default LandingPage;