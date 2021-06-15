import axios from "axios";
import {URL_HOME, URL_DETAIL} from "../../constants";

export const getVideogames = function(){
    return function(dispatch) {
        console.log("Get videogames pedido")
        return axios.get(URL_HOME)
            .then(response => {
                dispatch({
                    type: 'GET_VIDEOGAMES',
                    payload: response.data
                })
            })
    }
}

export const getMovieDetail = function(id){
    return function(dispatch) {
        console.log("Action salió ok hacia el reducer")
        return axios.get(`${URL_DETAIL}/${id}`)
            .then(response => {
                dispatch({
                    type: 'GET_VIDEOGAME_DETAIL',
                    payload: response.data
                })
            })
    }
    }


export const addMovieFavorite = function (payload) {
    return {
        type: 'ADD_MOVIE_FAVORITE',
        payload
    }
}

export const removeMovieFavorite = function (payload) {
    return {
        type: 'REMOVE_MOVIE_FAVORITE',
        payload
    }
}