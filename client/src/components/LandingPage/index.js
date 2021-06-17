import React from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { getInfo } from "../../store/actions";
import styles from "./landingPage.module.css"

const LandingPage = (props) =>  {

    const dispatch = useDispatch()
    dispatch(getInfo())


    return (
      <div className={styles.home} id={styles.contain}>
        <Link to={`/videogames`}>
          <button className={styles.homeButton}>Busca tu videogame favorito!</button>
        </Link>
      </div>
    );
  }

export default LandingPage;