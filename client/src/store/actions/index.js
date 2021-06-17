import axios from "axios";
import {URL_PPAL, URL_HOME, URL_DETAIL, URL_ADD_VIDEOGAME} from "../../constants";

export const getVideogames = function(name){
   
    if(!name){
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
        
        return function(dispatch) {
            console.log("Buscando videogames que coincidan con lo requerido")
            console.log(`La URL de consulta es: ${URL_HOME}?name=${name}`)
            return axios.get(`${URL_HOME}?name=${name}`)
                .then(response => {
                    dispatch({
                        type: 'SEARCH_VIDEOGAMES',
                        payload: response.data
                    })
                })
        }
}

export const getVideogameDetail = function(id){
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

export const getInfo = function(){
    return function(dispatch) {
        console.log("Get platforms/genre pedido")
        return axios.get(URL_PPAL)
            .then(response => {
                dispatch({
                    type: 'GET_INFO',
                    payload: response.data
                })
            })
    }
}

export const addVideogame = function (payload) {
    return function(dispatch) {
        console.log("Post para agregar videogame enviado")
        return axios.post(URL_ADD_VIDEOGAME,payload)
            .then(response => {
                console.log(response)})
            //     dispatch({
            //         type: 'GET_INFO',
            //         payload: response.data
            //     })
            // })
    }
}

export const searchVideogames = function (name) {
}