const initialState = {
    gamesLoaded: [],
    moviesSearched: [],
    movieDetail: {},
    movieTotalResults: null,
    genres: []
};

const rootReducer = (state=initialState,action) => {
    switch(action.type){
        case 'GET_VIDEOGAMES':
            return {
                ...state,
                gamesLoaded: action.payload.data
            }
            ;
        case 'GET_MOVIES':
            return {
                ...state
            }
        case 'REMOVE_MOVIE_FAVORITE':
            return {
                ...state
            }
        case 'GET_MOVIE_DETAIL':
            return {
                ...state
            }
        default:
            return {
                ...state
            }
    }
}

export default rootReducer;